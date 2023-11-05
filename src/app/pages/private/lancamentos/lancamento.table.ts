import {CdkDynamicTable} from "@datagrupo/dg-ng-util";

const defaultFindFunc = (val: string, nome: string) => {
  if (!!val) {
    return {[nome]: val}
  }
  return {}
}

export const LancamentoTable: CdkDynamicTable.createDynamicTable = {
  filters: {
    group: 'lancamentos', reactive: true, filters: {
      nome: { findFunc: val => defaultFindFunc(val, 'nome')},
      tipo: { findFunc: val => defaultFindFunc(val, 'tipo')},
    }
  }
}
