import {AbstractEntity, DataServer, DgTableColumn} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {environment} from "../../../../environments/environment";
import {LANCAMENTO} from "../../../_core/endpoints";
import {LocacaoEntity} from "../locacao/locacao.entity";

@DataServer({
  path: environment.apiUrl,
  context: LANCAMENTO
})
export class LancamentoEntity extends AbstractEntity {

  constructor(
    id?: number | string,
    cliente?: ClientesEntity,
    valor?: number | string,
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
    this.valor = valor;
    this.data_vencimento = data_vencimento;
    this.data_pagamento = data_pagamento;
    this.descricao = descricao;
    this.cliente_fornecedor = cliente_fornecedor;
    this.forma_pgto = forma_pgto;
    this.tipo = tipo;
    this.baixado = !!baixado;
    this.locacao = locacao;
  }

  @DgTableColumn({ columnName: 'Tipo' })
  public tipo?: string | undefined

  @DgTableColumn({ columnName: 'Cliente', resource: (val: ClientesEntity) => val?.nome || '--' })
  public cliente?: ClientesEntity | undefined
  public valor?: number | string | undefined
  public data_vencimento?: string | undefined
  public data_pagamento?: string | undefined
  public descricao?: string | undefined
  public cliente_fornecedor?: string | undefined
  public forma_pgto?: string | undefined
  public baixado: boolean = false
  public locacao: LocacaoEntity | undefined

}
