import {setConfigDynamicTable} from "@datagrupo/dg-ng-util";


export const configLocalDynamicTable: setConfigDynamicTable = {
  // apiData: {
  //   path: environment.ap,
  //   context: ''
  // },
  pipeRequest: (a: any) => {
    return a?.data || a;
  },
  outputParamsPagination: (value: any) => {
    const { page, size, sort } = value;
    return {page, size, sort}
  },
  pipePagination: (p:any) => {
    console.log('pipePagination', p)
    return { page: 0, totalPages: 0, totalElements: 10 };
  }
}
