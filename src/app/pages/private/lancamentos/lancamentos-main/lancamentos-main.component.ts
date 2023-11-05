import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoEntity} from "../lancamento.entity";
import {ModalLancamentoComponent} from "../sub-components/modal-lancamento/modal-lancamento.component";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup} from "@angular/forms";
import {LancamentoTable} from "../lancamento.table";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {ModalBaixarComponent} from "../sub-components/modal-baixar/modal-baixar.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lancamentos-main',
  templateUrl: './lancamentos-main.component.html',
  styleUrls: ['./lancamentos-main.component.scss']
})
export class LancamentosMainComponent implements OnInit {

  @ViewChild('modalLancamentos') modalLancamento!: ModalLancamentoComponent;
  @ViewChild('modalBaixar') modalBaixar!: ModalBaixarComponent;

  form = new FormGroup({
    nome: new FormControl(''),
    tipo: new FormControl(''),
  })

  public table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService,
    private service: GenericService
  ) {
    this.table = CdkTable.createByCrudEnity2(new LancamentoEntity(), {
      ...LancamentoTable,
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: LancamentoEntity) => {
            this.modalLancamento.open(val)
          }
        },
        baixar: {
          name: 'Baixar',
          action: (val: LancamentoEntity) => {
            this.modalBaixar.open(val)
          },
          permission: (val: LancamentoEntity) => {
            return !val.baixado;
          }
        },
        desfazer: {
          name: 'Desfazer pagamento',
          action: (val: LancamentoEntity) => {
            Swal.fire({
              icon: 'question',
              title: 'Desfazer pagamento',
              text: 'Você está prestes a informar ao sistema que o pagamento não foi realizado. Está certo disso?',
              showCancelButton: true,
              cancelButtonText: 'Cancelar'
            }).then()
          },
          permission: (val: LancamentoEntity) => {
            return !!val.baixado;
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
