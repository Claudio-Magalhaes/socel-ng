import {CdkCrudConfig} from "@datagrupo/dg-crud";


export const ConfigLocalDgCrud: CdkCrudConfig.setRepository = {
  api: {
    inputPipe: (resp: any) => resp?.data || resp,
    typeData: {
      findOne: 'param',
      update: 'data'
    }
  },
  typeCallbackMessage: 'event',
}
