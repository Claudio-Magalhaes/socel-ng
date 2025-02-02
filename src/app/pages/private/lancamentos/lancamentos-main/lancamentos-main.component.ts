import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoEntity} from "../lancamento.entity";
import {ModalLancamentoComponent} from "../sub-components/modal-lancamento/modal-lancamento.component";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup} from "@angular/forms";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {ModalBaixarComponent} from "../sub-components/modal-baixar/modal-baixar.component";
import Swal from "sweetalert2";
import {LANCAMENTO_DESFAZER_PAGAMENTO} from "../../../../_core/endpoints";

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
    id: new FormControl(''),
    baixado: new FormControl(''),
  })

  public table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService,
    private service: GenericService
  ) {
    this.table = CdkTable.createByEntity(new LancamentoEntity(), {
      actions: {
        edit: {
          edit: {
            action: (val: LancamentoEntity) => {
              this.modalLancamento.open(val)
            }
          },
          baixar: {
            action: (val: LancamentoEntity) => {
              this.modalBaixar.open(val)
            },
          },
          desfazer: {
            action: (val: LancamentoEntity) => {
              Swal.fire({
                icon: 'question',
                title: 'Desfazer pagamento',
                text: 'Você está prestes a informar ao sistema que o pagamento não foi realizado. Está certo disso?',
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
              }).then(confirm => {
                if (confirm.isConfirmed) {
                  this.table.find();
                  this.service.patch(LANCAMENTO_DESFAZER_PAGAMENTO + val.id, {}).subscribe(resp => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Pagamento desfeito'
                    }).then()
                  })
                }
              })
            },
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
