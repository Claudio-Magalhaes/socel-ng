import {AbstractEntity2, DataServer} from "@datagrupo/dg-crud";
import {DynamicColumn, DynamicTableEntity} from '@datagrupo/dg-ng-util'
import {environment} from "../../../../environments/environment";
import {CATEGORIAS} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: CATEGORIAS
})
@DynamicTableEntity({
  api: {
    path: environment.apiUrl,
    context: CATEGORIAS
  },
  filters: {
    group: 'categorias',
    reactive: true,
    filters: {
      nome: { findFunc: (val: any) => { return { nome_like: val} }, reactive: true }
    }
  },
  actions: {
    edit: {
      name: "Editar",
      dbClick: true,
      action: (val: CategoriasEntity) => {}
    }
  },
})
export class CategoriasEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    nome?: string,
    status?: boolean,
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.status = !!status
  }


  @DynamicColumn({ headerName: 'ID' })
  override id: number | string | undefined;
  @DynamicColumn({ headerName: 'nome' })
  nome: string | undefined;
  @DynamicColumn({ headerName: 'status', resource: (val:boolean) => !!val ? "ATIVO" : "INATIVO" })
  status: boolean = false;
}
