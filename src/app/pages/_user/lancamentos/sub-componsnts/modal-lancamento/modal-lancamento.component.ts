import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../../../shared/ui/modal/modal.component";
import {LancamentoEntity} from "../../lancamento.entity";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {CLIENTE, LANCAMENTO} from "../../../../../_core/endpoints";
import {ClientesEntity} from "../../../clientes/clientes.entity";

@Component({
  selector: 'subComponent-modal-lancamento',
  templateUrl: './modal-lancamento.component.html',
  styleUrls: ['./modal-lancamento.component.scss']
})
export class ModalLancamentoComponent implements OnInit {

  @ViewChild('modal') modal!: ModalComponent

  public entity = new LancamentoEntity()

  public form = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    data_vencimento: new FormControl('', [Validators.required]),
    descricao: new FormControl(''),
  })

  public listClientes: ClientesEntity[] = [];
  constructor(private service: GenericService) {
    service.get(CLIENTE).subscribe(
      resp => {
        this.listClientes = resp.data;
      }
    )
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

  open(val: LancamentoEntity){
    this.entity = val;

    this.form.patchValue({
      ...val,
      cliente: val.cliente?.id
    })

    this.modal.open()
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
        window.dispatchEvent(new CustomEvent('dg-table-atualizar-event', { detail: 'LancamentoEntity' }))
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

  public close = () => {
    this.form.reset('');
    this.entity = new LancamentoEntity();
  }
}
