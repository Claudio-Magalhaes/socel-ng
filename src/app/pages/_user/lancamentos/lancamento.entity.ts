import {AbstractEntity, DataServer} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {environment} from "../../../../environments/environment";
import {LANCAMENTO} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: LANCAMENTO
})
export class LancamentoEntity extends AbstractEntity {

  constructor(
    id?: number | string,
    cliente?: ClientesEntity,
    valor?: number | string,
    vencimento?: string,
  ) {
    super();
    this.id = id;
    this.cliente = cliente;
    this.valor = valor;
    this.vencimento = vencimento;
  }

  public cliente?: ClientesEntity | undefined
  public valor?: number | string | undefined
  public vencimento?: string | undefined
}
