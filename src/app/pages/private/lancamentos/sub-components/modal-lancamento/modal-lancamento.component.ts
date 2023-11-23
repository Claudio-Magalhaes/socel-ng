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
    valor: new FormControl('', [Validators.required]),
    data_vencimento: new FormControl('', [Validators.required]),
    descricao: new FormControl(''),
  })

  public listClientes: ClientesEntity[] = [];
  constructor(private service: GenericService) {
  }

  ngOnInit(): void {
  }

  addReceita() {
    this.entity.tipo = 'RECEITA'
    this.modal.open()
  }

  addDespesa() {
    this.entity.tipo = 'DESPESA'
    this.modal.open()
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
          cliente: val.cliente?.id
        })

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
      cliente: { id: form.cliente }
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
