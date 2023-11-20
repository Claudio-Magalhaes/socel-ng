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
    console.log('pipePagination', p.page)
    // const {number, totalPages} = p.page;
    return {
      page: p?.page?.number || 0,
      totalPages: p?.page?.totalPages || 0,
      totalElements: p?.page?.totalElements || 0
    };
  }
}


export declare type generateActionRemove = {
  id: string | number | (string | number)[] | undefined,
  url: string,
  callback: string | (() => void),
  messageBefore?: { title: string, text: string },
  messageAfter?: { title: string, text: string }
}

export const genereteDefaultActionTable = {
  remover: (data: generateActionRemove) => {
    if (data.id == undefined) return;

    window.dispatchEvent(
      new CustomEvent('default-actions-dg-tables-remove',
        {
          detail: {
            id: data.id,
            url: data.url,
            callback: data.callback,
            messageBefore: data.messageBefore,
            messageAfter: data.messageAfter
          }
        }
      )
    )
  },
  link: (router: (string | number)[]) => {
    window.dispatchEvent(
      new CustomEvent('default-actions-dg-tables-router',
        {detail: router}))
  }
}
