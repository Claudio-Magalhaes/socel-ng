import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../../environments/environment";
import {CLIENTE_CONTATOS} from "../../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl_mock,
  context: CLIENTE_CONTATOS
})
export class ContatoEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    telefone?: string,
    email?: string,
    descricao?: string,
    principal?: boolean
  ) {
    super();
    this.id = id;
    this.telefone = telefone;
    this.email = email;
    this.descricao = descricao;
    this.principal = !!principal;
  }

  @DynamicColumn({ headerName: 'Descrição' })
  public descricao: string | undefined
  @DynamicColumn({ headerName: 'Telefone' })
  public telefone: string | undefined
  @DynamicColumn({ headerName: 'E-mail' })
  public email: string | undefined
  @DynamicColumn({ headerName: 'Principal' })
  public principal: boolean = false

}
