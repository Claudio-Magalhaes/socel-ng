import {CdkDynamicTable} from "@datagrupo/dg-ng-util";
import {CategoriasEntity} from "./categorias.entity";


export const CategoriasTable: CdkDynamicTable.createDynamicTable = {
  filters: {
    group: 'categorias',
    reactive: true,
    filters: {
      nome: { findFunc: val => { return { nome_like: val} }, reactive: true }
    }
  },
  actions: {
    edit: {
      name: "Editar",
      dbClick: true,
      action: (val: CategoriasEntity) => {}
    }
  },
}
