import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {USUARIO} from "../../../_core/endpoints";
import {PermissaoEntity} from "../permissoes/permissao.entity";

@DataServer({
  path: environment.apiUrl_mock,
  context: USUARIO
})
export class UsuariosEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    nome?: string,
    cpf?: string,
    permissao?: PermissaoEntity,
    email?: string,
    telefone?: string
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.permissao = permissao;
    this.email = email;
    this.telefone = telefone;
  }

  @DynamicColumn({ headerName: 'Nome' })
  public nome: string | undefined;
  public cpf: string | undefined
  public email: string | undefined
  public telefone: string | undefined
  public permissao: PermissaoEntity | undefined
}
