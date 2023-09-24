import {setRootConfigDgCrud} from "@datagrupo/dg-crud";

export const ConfigLocalDgCrud: setRootConfigDgCrud = {
  pipeRequest: resp => {
    console.log('pipeRequest', resp)
    return resp;
  },
  typeData: {
    findOne: 'param',
    update: 'param'
  },
  typeCallbackMessage: 'event'
}
