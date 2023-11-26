import {HostListener, Injectable} from '@angular/core';
import {GenericService} from "../../../../services/generic-service/generic.service";
import Swal from "sweetalert2";
import {LOCACAO, LOCACAO_FATURAR, LOCACAO_RENOVAR, LOCACAO_STATUS} from "../../../../_core/endpoints";
import {LocacaoEntity} from "../locacao.entity";

export declare type receiveEventLocacaoActions = {
  typeEvent: 'iniciar' | 'finalizar' | 'cancelar' | 'faturar' | 'verLancamento' | 'renovar',
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
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Iniciar",
      denyButtonText: `Iniciar e faturar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.changeStatus(id, 'EM_LOCACAO', callback)
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  cancelar() {
    alert('criar cancelar')
  }

  faturar(id: number | string, callback?: (val: any) => void) {
    Swal.fire({
      icon: 'question',
      title: 'Faturar locação',
      text: 'Gerar um lançamento para essa locação',
      showCancelButton: true
    }).then(confirm => {
      if (confirm.isConfirmed) {
        this.service.patch(LOCACAO_FATURAR + id, {}).subscribe(
          resp => {
            if (callback) {
              callback(resp.data)
            }
          }
        )
      }
    })
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

  renovar(id: number | string, callback?: (val: any) => void) {
    Swal.fire({
      icon: 'question',
      title: 'Renovar Locação',
      text: 'Uma nova locação será criaca com os mesmos dados, exceto os serviços realizados. '+
        'Caso não exista um lançamento para essa locação, ele será automaticamente criado.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(confirm => {
      if (confirm.isConfirmed) {
        this.service.patch(LOCACAO_RENOVAR + id, {}).subscribe(
          resp => {
            if (callback) {
              callback(resp.data)
            }
          }
        )
      }
    })
  }

  receiveEventLocacaoActions(
    ev: receiveEventLocacaoActions,
    callback?: () => void
  ) {
    if (ev.typeEvent == 'verLancamento') return;

    if (!ev.row?.id) return
    this[ev.typeEvent](ev.row.id, callback)
  }
}
