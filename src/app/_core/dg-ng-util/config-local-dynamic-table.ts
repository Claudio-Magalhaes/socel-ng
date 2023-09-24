import {setConfigDynamicTable} from "dg-ng-util";
import {environment} from "../../../environments/environment";

export const configLocalDynamicTable: setConfigDynamicTable = {
  apiData: {
    path: environment.apiUrl_mock,
    context: ''
  },
  pipeRequest: (a: any) => {
    return a
  },
  pipePagination: (p:any) => {
    console.log('pipePagination', p)
    return { page: 0, totalPages: 0, totalElements: 10 };
  }
}
