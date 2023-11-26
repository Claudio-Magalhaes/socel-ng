import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {ContatoEntity} from "../clientes/_entitys/contato.entity";
import {EnderecoEntity} from "../clientes/_entitys/endereco.entity";
import {environment} from "../../../../environments/environment";
import {LOCACAO} from "../../../_core/endpoints";
import {LancamentoEntity} from "../lancamentos/lancamento.entity";
import {funcIconsFaturado} from "../lancamentos/lancamento.table";
import {classesStatus} from "./locacao.table";

@DataServer({
  path: environment.apiUrl,
  context: LOCACAO
})
export class LocacaoEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    cliente?: ClientesEntity,
    contato?: ContatoEntity,
    endereco?: EnderecoEntity,
    lancamento?: LancamentoEntity,
    renovacao?: LocacaoEntity,
    status?: string,
    dataInicial?: string,
    dataFinal?: string,
    descricao?: string,
    obsercacoes?: string,
  ) {
    super();
    this.id = id;
    this.cliente = cliente;
    this.contato = contato;
    this.endereco = endereco;
    this.status = status;
    this.dataInicial = dataInicial;
    this.dataFinal = dataFinal;
    this.descricao = descricao;
    this.obsercacoes = obsercacoes;
    this.lancamento = lancamento;
    this.renovacao = renovacao;
  }

  @DynamicColumn({headerName: 'ID', tdClass: classesStatus})
  override id: number | string | undefined;
  @DynamicColumn({headerName: 'Cliente', tdClass: classesStatus, resource: (val: ClientesEntity) => String(val.nome || '--')})
  public cliente: ClientesEntity | undefined
  @DynamicColumn({headerName: 'Data Início', tdClass: classesStatus, resource: val => !!val ? val.split('-').reverse().join('/') : '--'})
  public dataInicial: string | undefined
  @DynamicColumn({headerName: 'Data Fim', tdClass: classesStatus, resource: val => !!val ? val.split('-').reverse().join('/') : '--'})
  public dataFinal: string | undefined
  @DynamicColumn({
    headerName: 'Status', tdClass: classesStatus, resource: (val) => {
      switch (val) {
        case 'FINALIZADA':
          return '<span class="badge status text-bg-success">Finalizada</span>'
        case 'EM_LOCACAO':
          return '<span class="badge status text-bg-warning">Em locação</span>'
        case 'ABERTO':
          return '<span class="badge status text-bg-secondary">Aberta</span>'
        default:
          return val;
      }
    }
  })
  public status: string | undefined

  @DynamicColumn({headerName: 'Valor', tdClass: classesStatus})
  public total: string | undefined

  @DynamicColumn({
    headerName: 'Faturamento', tdClass: classesStatus, resource: (val: LancamentoEntity | undefined) => {
      if (!!val) {
        return funcIconsFaturado(!!val, val)
      }
      return '<span class="material-symbols-outlined" data-toggle="tooltip" data-placement="top" title="Aguardando Faturamento">' +
        'note_add</span>'
    }
  })
  public lancamento: LancamentoEntity | undefined

  public renovacao: LocacaoEntity | undefined
  public contato: ContatoEntity | undefined
  public endereco: EnderecoEntity | undefined
  public descricao: string | undefined
  public obsercacoes: string | undefined
  public totalServicos: string | number | undefined
  public totalProdutos: string | number | undefined

}
