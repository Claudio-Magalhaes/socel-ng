// import { Injectable } from '@angular/core';
// import {GenericService} from "../generic-service/generic.service";
// import {CLIENTE_ENDERECOS} from "../../_core/endpoints";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class MockService {
//
//   constructor(private service: GenericService) { }
//
//   getListData(context: string, action: Function) {
//     this.service.get(context).subscribe(
//       resp => {
//         action(resp.data)
//       }
//     )
//   }
//
//   save(context: string, data: any, list: any[]) {
//     const dataFinal = {
//       ...data,
//       id: (list.length + 1),
//       status_mock: true
//     }
//
//     list.push(dataFinal)
//
//     return this.service.post(context, { data: list })
//   }
//
//   update(context: string, data: any, list: any[]) {
//     const index = list.findIndex((val) => {
//       return val.id == data.id
//     })
//
//     if (index == -1) throw 'id não encontrado'
//
//     const dataFinal = {
//       ...list[index],
//       ...data,
//     }
//
//     list.splice(index, 1, dataFinal)
//
//     return this.service.post(context, { data: list })
//   }
//
//   delete() {
//
//   }
// }
