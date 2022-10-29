import {AbstractEntity, DataServer, DgTableColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../../environments/environment";
import {CLIENTE_CONTATOS} from "../../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl_mock,
  context: CLIENTE_CONTATOS
})
export class ContatoEntity extends AbstractEntity {

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

  @DgTableColumn({ columnName: 'Descrição' })
  public descricao: string | undefined
  @DgTableColumn({ columnName: 'Telefone' })
  public telefone: string | undefined
  @DgTableColumn({ columnName: 'E-mail' })
  public email: string | undefined
  @DgTableColumn({ columnName: 'Principal' })
  public principal: boolean = false

}
