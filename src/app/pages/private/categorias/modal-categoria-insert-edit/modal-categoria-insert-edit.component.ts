import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DgModalComponent} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CATEGORIAS, LOCACAO_SERVICOS} from "../../../../_core/endpoints";
import {ServicoEntity} from "../../servicos/servico.entity";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {CategoriasEntity} from "../categorias.entity";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'modal-categoria-insert-edit',
  templateUrl: './modal-categoria-insert-edit.component.html',
  styleUrls: ['./modal-categoria-insert-edit.component.scss']
})
export class ModalCategoriaInsertEditComponent implements OnInit {

  @ViewChild('modal') modal!: DgModalComponent;

  @Output('afterSave') afterSave = new EventEmitter<any>()

  public form = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', [Validators.required]),
    status: new FormControl(true)
  })

  constructor(private service: GenericService) {
    this.service.changePath(environment.apiUrl)
  }

  ngOnInit(): void {
  }

  open(data?: CategoriasEntity) {
    if (!data) {
      this.modal.open()
      return;
    }

    this.service.get(CATEGORIAS + '/' + data.id).subscribe(resp => {
      // this.form.patchValue({...resp.data, status: resp.status == 'true' || resp.status == true});
      this.form.patchValue({...resp.data});
      this.modal.open()
    })
  }

  clear() {
    this.form.reset({ nome: '', status: true })
  }

  close() {
    this.modal.close()
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const form = this.form.value;
    form.status = form.status == 'true' || form.status == true;
    let request: any

    if (!!form.id) {
      request = this.service.put(CATEGORIAS + '/' + form.id, form)
    } else {
      delete form.id;
      request = this.service.post(CATEGORIAS, form)
    }

    request.subscribe((resp: ServicoEntity) => {
      this.afterSave.emit(resp)
      this.close()
    })
  }
}
