import {CdkDynamicGroup} from "@datagrupo/dg-ng-util";

export const produtosFilters: {[key: string]: CdkDynamicGroup.setFilter} = {
  nome: { findFunc: val => { return { nome_like: val} }, reactive: true }
}
