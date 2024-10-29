import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LancamentoEntity} from "../../lancamento.entity";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {CLIENTE, LANCAMENTO} from "../../../../../_core/endpoints";
import {ClientesEntity} from "../../../clientes/clientes.entity";
import {DgModalComponent} from "@datagrupo/dg-ng-util";

@Component({
  selector: 'modal-lancamento',
  templateUrl: './modal-lancamento.component.html',
  styleUrls: ['./modal-lancamento.component.scss']
})
export class ModalLancamentoComponent implements OnInit {

  @ViewChild('modal') modal!: DgModalComponent

  @Output('afterSave') afterSave = new EventEmitter<void>()

  public entity = new LancamentoEntity()

  public form = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    data_vencimento: new FormControl('', [Validators.required]),
    descricao: new FormControl(''),
    baixado: new FormControl(false),
    data_pagamento: new FormControl('', [Validators.required]),
    forma_pgto: new FormControl('', [Validators.required]),
  })

  public listClientes: ClientesEntity[] = [];

  constructor(private service: GenericService) {
    this.form.controls['baixado'].valueChanges.subscribe((val: boolean) => {
      this.form.controls['data_pagamento'][val ? 'enable' : 'disable' ]()
      this.form.controls['forma_pgto'][val ? 'enable' : 'disable' ]()
    })
  }

  ngOnInit(): void {
  }

  addReceita(data?: Partial<LancamentoEntity>) {
    this.service.get(CLIENTE).subscribe(
      resp => {
        this.listClientes = resp.data;

        this.entity.tipo = 'RECEITA'
        if (data) {
          this.form.patchValue({
            cliente: data?.cliente?.id || '',
            total: data?.total,
            data_vencimento: data?.data_vencimento || '',
            descricao: data?.descricao || ''
          })

          if (data.cliente) {
            this.listClientes = [data.cliente];
            this.form.controls['cliente'].disable();
          }
        }
        this.modal.open()
      }
    )
  }

  addDespesa() {
    this.service.get(CLIENTE).subscribe(
      resp => {
        this.listClientes = resp.data;

        this.entity.tipo = 'DESPESA'
        this.modal.open()
      }
    )
  }

  async open(val: LancamentoEntity) {
    await this.service.get(CLIENTE).subscribe(
      resp => {
        this.listClientes = resp.data;
      }
    )

    if (!val) return this.modal.open();

    await this.service.get(LANCAMENTO + '/' + val.id).subscribe(
      resp => {
        this.entity = resp.data;

        this.form.patchValue({
          ...resp.data,
          cliente: resp.data?.cliente?.id,
        })

        if (!!resp.data.cliente) {
          this.listClientes.push(resp.data.cliente)
        }

        this.modal.open()
      }
    )
  }

  close() {
    this.modal.close()
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.value;

    this.entity = {
      ...this.entity,
      ...form,
      cliente: {id: form.cliente}
    }

    this.saveOrUpdate(this.entity).subscribe(
      resp => {
        this.afterSave.emit()
        this.close()
      }
    )
  }

  saveOrUpdate(entity: LancamentoEntity) {
    if (!!entity.id) {
      return this.service.put(LANCAMENTO, entity)
    } else {
      return this.service.post(LANCAMENTO, entity)
    }
  }

  clear() {
    this.form.reset('');
    this.entity = new LancamentoEntity();
  }
}
