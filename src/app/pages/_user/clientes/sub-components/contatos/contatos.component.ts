import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../../../shared/ui/modal/modal.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MockService} from "../../../../../services/mock/mock.service";
import {CLIENTE_CONTATOS} from "../../../../../_core/endpoints";
import {EnderecoEntity} from "../../_entitys/endereco.entity";
import Swal from "sweetalert2";
import {ContatoEntity} from "../../_entitys/contato.entity";
import {GenericService} from "../../../../../services/generic-service/generic.service";

@Component({
  selector: 'subComponent-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  @ViewChild('modal') modal!: ModalComponent;

  @Input('idCliente') idCliente: number | string | undefined;

  public edit = false;
  public idContato: number | string | undefined;

  public form = new FormGroup({
    descricao: new FormControl(''),
    telefone: new FormControl(''),
    email: new FormControl(''),
    principal: new FormControl('')
  })

  constructor(public service: GenericService) {
    // this.getMock();
  }

  // getMock() {
  //   this.service.getListData(CLIENTE_CONTATOS, (data: EnderecoEntity[]) => this.dataMock = data)
  // }

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
    const form = this.form.value;

    if (!form.telefone && !form.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Um telefone ou e-mail deve ser informado',
        timer: 3000
      }).then();
      return;
    }

    const data = {
      ...form,
      cliente: { id: this.idCliente }
    }

    this.saveOrUpdate(data).subscribe(
      resp => {
        console.log(data);
        window.dispatchEvent(new CustomEvent('dg-table-atualizar-event', { detail: 'ContatoEntity' }));
        this.modal.close();
      }
    )
  }
}
