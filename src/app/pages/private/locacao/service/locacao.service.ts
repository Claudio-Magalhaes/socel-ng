import {HostListener, Injectable} from '@angular/core';
import {GenericService} from "../../../../services/generic-service/generic.service";
import Swal from "sweetalert2";
import {LOCACAO, LOCACAO_STATUS} from "../../../../_core/endpoints";
import {LocacaoEntity} from "../locacao.entity";

export declare type receiveEventLocacaoActions = {
  typeEvent: 'iniciar' | 'finalizar' | 'cancelar' | 'faturar',
  row: LocacaoEntity
};

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {

  constructor(private service: GenericService) { }

  public changeStatus(id: number | string, status: 'ABERTO' | 'EM_LOCACAO' | string, callback?: () => void) {
    this.service.patch(LOCACAO_STATUS, { id, status }).subscribe(
      resp => !!callback ? callback() : null
    )
  }

  public iniciar(id: number | string, callback?: () => void) {
    Swal.fire({
      icon: 'question',
      title: 'Iniciar locação',
      text: 'Você não poderá mais editar os PRODUTOS e SERVIÇOS desta locação',
      showCancelButton: true
    }).then(confirm => {
      if (confirm.isConfirmed) {
        this.changeStatus(id, 'EM_LOCACAO', callback)
      }
    })
  }

  cancelar() {
    alert('criar cancelar')
  }

  faturar() {
    alert('criar faturar')
  }

  public finalizar(id: number | string, callback?: () => void) {
    Swal.fire({
      icon: 'question',
      title: 'Finalizar locação',
      text: 'Você não poderá mais editar os PRODUTOS e SERVIÇOS desta locação',
      showCancelButton: true
    }).then(confirm => {
      if (confirm.isConfirmed) {
        this.changeStatus(id, 'FINALIZADA', callback)
      }
    })
  }

  receiveEventLocacaoActions(
    ev: receiveEventLocacaoActions,
    callback?: () => void
  ) {
    if (!ev.row?.id) return
    this[ev.typeEvent](ev.row.id, callback)
  }
}
