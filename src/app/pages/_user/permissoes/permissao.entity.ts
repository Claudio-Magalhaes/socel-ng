import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {PERMISSAO} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl_mock,
  context: PERMISSAO
})
export class PermissaoEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    nome?: string
  ) {
    super();
    this.id = id;
    this.nome = nome;
  }

  @DynamicColumn({ headerName: 'Nome' })
  public nome: string | undefined;
}
