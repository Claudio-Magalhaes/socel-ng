import {CdkDynamicTable} from "@datagrupo/dg-ng-util";
import {genereteDefaultActionTable} from "../../../_core/config/dg-ng-util/config-local-dynamic-table";


export const ClientesTable: CdkDynamicTable.createDynamicTable = {
  filters: {
    group: 'clientes',
    reactive: true,
    filters: {
      // nome: { findFunc: val => { return { nome: val} }, reactive: true },
      // status: { findFunc: val => { return { status: val} }, reactive: true },
      // documento: { findFunc: val => { return { documento: val} }, reactive: true }
    }
  },
  sort: true,
  actions: {
    editar: {
      name: 'Editar', dbClick: true, action: val => {
        genereteDefaultActionTable.link(['user', 'clientes', val.id])
      }
    }
  },
}
