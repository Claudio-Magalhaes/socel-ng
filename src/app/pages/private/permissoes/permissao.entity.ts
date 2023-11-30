import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {PERMISSAO} from "../../../_core/endpoints";
import {DynamicTableEntity} from "@datagrupo/dg-ng-util";

@DataServer({
  path: environment.apiUrl_mock,
  context: PERMISSAO
})
@DynamicTableEntity({
  actions: {
    edit: {
      name: 'Editar',
      dbClick: true,
      action: (val: PermissaoEntity) => {
        // this.router.navigate(['user', 'configuracoes', 'permissoes', val?.id]).then()
      }
    }
  }
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
