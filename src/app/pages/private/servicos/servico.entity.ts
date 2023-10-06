import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {SERVICO} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl_mock,
  context: SERVICO
})
export class ServicoEntity extends AbstractEntity2 {
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

  @DynamicColumn({ headerName: 'nome' })
  nome: string | undefined

  @DynamicColumn({ headerName: 'Valor Base' })
  valorBase: number | string | undefined

  descricao: string | undefined
}
