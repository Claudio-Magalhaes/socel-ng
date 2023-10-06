import {CdkDynamicGroup} from "@datagrupo/dg-ng-util";

export const clienteFilters: {[key: string]: CdkDynamicGroup.setFilter} = {
  nome: { findFunc: val => { return { nome_like: val} }, reactive: true }
}
