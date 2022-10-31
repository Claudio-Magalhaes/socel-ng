import {AbstractEntity, DataServer, DgTableColumn} from "@datagrupo/dg-crud";
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

  @DgTableColumn({ columnName: 'Nome' })
  public nome: string | undefined;
}
