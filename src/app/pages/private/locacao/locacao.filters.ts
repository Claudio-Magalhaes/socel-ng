import {CdkDynamicGroup} from "@datagrupo/dg-ng-util";


export const LocacaoFilters: {[key: string]: CdkDynamicGroup.setFilter} = {
  nomeCliente: { reactive: true, findFunc: val => { return { nomeCliente: val } } },
  status: { reactive: true, findFunc: val => { return { status: val } } },
  dataInicial: { reactive: true, findFunc: val => { return { dataInicial: val } } },
  dataFinal: { reactive: true, findFunc: val => { return { dataFinal: val } } },
}
