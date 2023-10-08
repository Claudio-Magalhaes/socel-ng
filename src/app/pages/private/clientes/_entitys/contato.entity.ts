import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../../environments/environment";
import {CLIENTE_CONTATOS} from "../../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
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

  @DynamicColumn({headerName: 'Descrição'})
  public descricao: string | undefined
  @DynamicColumn({headerName: 'Telefone'})
  public telefone: string | undefined
  @DynamicColumn({headerName: 'E-mail'})
  public email: string | undefined
  @DynamicColumn({
    headerName: 'Principal', resource: (val: boolean) => {
      if (val) {
        return '<i style="font-size: 16pt" class="bi bi-star-fill fc-yellow"></i>'
      }

      return '<i style="color: gray; font-size: 16pt" class="bi bi-star"></i>'
    }
  })
  public principal: boolean = false

}
