import {AbstractEntity, DataServer, DgTableColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {SERVICO} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: SERVICO
})
export class ServicoEntity extends AbstractEntity {
  constructor(
    id?: number | string,
    nome?: string,
    valorBase?: number | string,
    descricao?: string
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.valorBase = valorBase;
    this.descricao = descricao;
  }

  @DgTableColumn({ columnName: 'nome' })
  nome: string | undefined

  @DgTableColumn({ columnName: 'Valor Base' })
  valorBase: number | string | undefined

  descricao: string | undefined
}
