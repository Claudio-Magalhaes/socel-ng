import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContatoEntity} from "../../_entitys/contato.entity";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {DgModalComponent} from "dg-ng-util";
import {CLIENTE_CONTATOS} from "../../../../../_core/endpoints";
import Swal from 'sweetalert2';

@Component({
  selector: 'subComponent-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  @ViewChild('modal') modal!: DgModalComponent;

  @Input('idCliente') idCliente: number | string | undefined;
  @Output('afterSave') afterSave = new EventEmitter<void>()

  public edit = false;
  public idContato: number | string | undefined;

  public form = new FormGroup({
    id: new FormControl(''),
    descricao: new FormControl(''),
    telefone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    principal: new FormControl('')
  })

  constructor(public service: GenericService) {
  }

  ngOnInit(): void {
  }

  public open(data?: ContatoEntity) {
    if (!this.idCliente) return;

    if (!!data) {
      this.form.patchValue({
        ...data
      })
      this.idContato = data.id;
      this.edit = true;
      this.modal.open()
    } else {
      this.modal.open()
    }
  }

  close = () => {
    this.form.reset('')
    this.idContato = undefined;
    this.edit = false;
  }

  saveOrUpdate(data: any) {
    if (this.edit) {
      data['id'] = this.idContato;
      // return this.service.update(CLIENTE_CONTATOS, data, this.dataMock)
      return this.service.put(CLIENTE_CONTATOS, data)
    } else {
      // return this.service.save(CLIENTE_CONTATOS, data, this.dataMock)
      return this.service.post(CLIENTE_CONTATOS, data)
    }
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Preencha os campos obrigatórios',
        timer: 3000
      }).then();
      return;
    }
    const form = this.form.value;

    const data = {
      ...form,
      cliente: this.idCliente
    }

    let request: any;

    if (!!form?.id) {
      request = this.service.put(CLIENTE_CONTATOS, data)
    } else {
      request = this.service.post(CLIENTE_CONTATOS, data)
    }

    request.subscribe(
      () => {
        this.modal.close();
        this.afterSave.emit()
      }
    )
  }
}
