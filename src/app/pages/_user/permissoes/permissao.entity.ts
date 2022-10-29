import {AbstractEntity, DataServer} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {PERMISSAO} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: PERMISSAO
})
export class PermissaoEntity extends AbstractEntity {

  constructor(
    id?: number | string,
    nome?: string
  ) {
    super();
    this.id = id;
    this.nome = nome;
  }

  public nome: string | undefined;
}
