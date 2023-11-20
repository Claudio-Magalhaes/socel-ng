import {CdkDynamicTable} from "@datagrupo/dg-ng-util";
import {genereteDefaultActionTable} from "../../../_core/config/dg-ng-util/config-local-dynamic-table";


export const ProdutosTable: CdkDynamicTable.createDynamicTable = {
  filters: {
    group: 'produtos',
    reactive: true,
    filters: {
      nome: { findFunc: val => { return { nome: val} }, reactive: true },
      status: { findFunc: val => { return { status: val} }, reactive: true }
    }
  },
  sort: true,
  actions: {
    editar: {
      name: 'Editar', dbClick: true, action: val => {
        genereteDefaultActionTable.link(['user', 'produtos', val.id])
      }
    }
  },
}
