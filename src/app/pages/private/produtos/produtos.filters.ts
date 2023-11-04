import {CdkDynamicGroup} from "@datagrupo/dg-ng-util";

export const produtosFilters: {[key: string]: CdkDynamicGroup.setFilter} = {
  nome: { findFunc: val => { return { nome: val} }, reactive: true },
  status: { findFunc: val => { return { status: val} }, reactive: true }
}
