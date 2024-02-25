import {AbstractEntity2, DataServer} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {environment} from "../../../../environments/environment";
import {LANCAMENTO, LANCAMENTO_DESFAZER_PAGAMENTO} from "../../../_core/endpoints";
import {LocacaoEntity} from "../locacao/locacao.entity";
import {DynamicTableEntity, DynamicColumn} from "@datagrupo/dg-ng-util";
import Swal from "sweetalert2";

export
const funcIconsFaturado = (val: boolean, row: LancamentoEntity) => {
  if (!!val) {
    return '<span class="material-symbols-outlined fatura-pago" data-toggle="tooltip" data-placement="top" title="Pago">select_check_box</span>';
  }
  if (row.data_vencimento && !val) {
    const date = new Date(row.data_vencimento)
    const loucurasDoJs = new Date().toLocaleDateString('pt-br')
    const currentDate = new Date(loucurasDoJs.split('/').reverse().join('-'));

    if (date < currentDate) {
      return '<span class="material-symbols-outlined fatura-atrazado" data-toggle="tooltip" data-placement="top" title="Atrazado">hourglass_bottom</span>';
    }
  }

  return '<span class="material-symbols-outlined" data-toggle="tooltip" data-placement="top" title="Aguardando Pagamento">hourglass_top</span>'
}

@DataServer({
  path: environment.apiUrl,
  context: LANCAMENTO
})
@DynamicTableEntity({
  api: {
    path: environment.apiUrl,
    context: LANCAMENTO
  },
  actions: {
    edit: {
      name: 'Editar',
      dbClick: true,
      action: (val: LancamentoEntity) => {}
    },
    baixar: {
      name: 'Baixar',
      action: (val: LancamentoEntity) => {},
      permission: (val: LancamentoEntity) => {
        return !val.baixado;
      }
    },
    desfazer: {
      name: 'Desfazer pagamento',
      action: (val: LancamentoEntity) => {},
      permission: (val: LancamentoEntity) => {
        return !!val.baixado;
      }
    }
  },
  filters: {
    group: 'lancamentos', reactive: true
  },
  sort: true
})
export class LancamentoEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    cliente?: ClientesEntity,
    total?: number | string,
    data_vencimento?: string,
    data_pagamento?: string,
    descricao?: string,
    cliente_fornecedor?: string,
    forma_pgto?: string,
    tipo?: string,
    baixado?: boolean,
    locacao?: LocacaoEntity,
  ) {
    super();
    this.id = id;
    this.cliente = cliente;
    this.total = total;
    this.data_vencimento = data_vencimento;
    this.data_pagamento = data_pagamento;
    this.descricao = descricao;
    this.cliente_fornecedor = cliente_fornecedor;
    this.forma_pgto = forma_pgto;
    this.tipo = tipo;
    this.baixado = !!baixado;
    this.locacao = locacao;
  }

  @DynamicColumn({headerName: 'ID'})
  override id: number | string | undefined;

  @DynamicColumn({
    headerName: 'Tipo', resource: (val: string) => {
      if (val == 'RECEITA') return '<span class="badge bg-success">Receita</span>'
      return '<span class="badge bg-danger">Despesa</span>'
    }
  })
  public tipo?: string | undefined

  @DynamicColumn({headerName: 'Cliente', resource: (val: ClientesEntity) => val?.nome || '--'})
  public cliente?: ClientesEntity | undefined

  @DynamicColumn({
    headerName: 'Valor', resource: (val,row) => {
      return 'R$:' + Number(val)
        .toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
  })
  public total?: number | string | undefined

  @DynamicColumn({
    headerName: 'Vencimento', resource: val => {
      if (!val) return '';
      return val.split('-').reverse().join('/')
    }
  })
  public data_vencimento?: string | undefined

  @DynamicColumn({headerName: 'Baixado', resource: funcIconsFaturado})
  public baixado: boolean = false

  public data_pagamento?: string | undefined
  public descricao?: string | undefined
  public cliente_fornecedor?: string | undefined
  public forma_pgto?: string | undefined
  public locacao: LocacaoEntity | undefined

}
