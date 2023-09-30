import {CdkDynamicGroup} from "@datagrupo/dg-ng-util";

export const clienteFilters: {[key: string]: CdkDynamicGroup.setFilter} = {
  nome: { findFunc: val => { return { id: val} } }
}
