import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {SERVICO} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: SERVICO
})
export class ServicoEntity extends AbstractEntity2 {
  constructor(
    id?: number | string,
    nome?: string,
    valorBase?: number | string,
    descricao?: string,
    status?: boolean
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.valorBase = valorBase;
    this.descricao = descricao;
    this.status = !!status;
  }

  @DynamicColumn({ headerName: 'nome' })
  nome: string | undefined

  @DynamicColumn({ headerName: 'Valor Base' })
  valorBase: number | string | undefined

  @DynamicColumn({ headerName: 'Status', resource: val => !!val ? 'ATIVO' : 'INATIVO' })
  status: boolean = false


  descricao: string | undefined
}
