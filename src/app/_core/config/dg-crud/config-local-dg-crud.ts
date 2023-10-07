import {setRootConfigDgCrud} from "@datagrupo/dg-crud";


export const ConfigLocalDgCrud: setRootConfigDgCrud = {
  pipeRequest: (resp: any) => resp?.data || resp,
  typeData: {
    findOne: 'param',
    // update: 'param'
  },
  typeCallbackMessage: 'event',
}
