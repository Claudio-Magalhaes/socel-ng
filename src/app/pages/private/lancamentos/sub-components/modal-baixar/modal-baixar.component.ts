import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LancamentoEntity} from "../../lancamento.entity";
import {DgModalComponent} from "@datagrupo/dg-ng-util";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {LANCAMENTO_BAIXAR} from "../../../../../_core/endpoints";
import Swal from "sweetalert2";

@Component({
  selector: 'modal-baixar',
  templateUrl: './modal-baixar.component.html',
  styleUrls: ['./modal-baixar.component.scss']
})
export class ModalBaixarComponent implements OnInit {

  @ViewChild('modal') modal!: DgModalComponent;

  @Output('afterSave') afterSave = new EventEmitter<void>()

  public form = new FormGroup({
    id: new FormControl(''),
    dataPagamento: new FormControl(''),
    formaPagamento: new FormControl(''),
  })

  constructor(private service: GenericService) { }

  ngOnInit(): void {
  }

  open(val: LancamentoEntity){
    this.form.patchValue({ id: val.id })
    this.modal.open()
  }

  close(){
    this.modal.close();
  }

  clear() {

  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.value;

    this.service.patch(LANCAMENTO_BAIXAR, form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Lançamento baixado',
        }).then();
        this.afterSave.emit()
        this.modal.close()
      }
    )
  }
}
