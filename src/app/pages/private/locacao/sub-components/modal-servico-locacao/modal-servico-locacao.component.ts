import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DgModalComponent} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {LOCACAO_SERVICOS, PRODUTOS, SERVICO, SERVICO_FILTER} from "../../../../../_core/endpoints";
import {ServicoEntity} from "../../../servicos/servico.entity";
import {LancamentoEntity} from "../../../lancamentos/lancamento.entity";

@Component({
  selector: 'modal-servico-locacao',
  templateUrl: './modal-servico-locacao.component.html',
  styleUrls: ['./modal-servico-locacao.component.scss']
})
export class ModalServicoLocacaoComponent implements OnInit {
  @ViewChild('modal') modal!: DgModalComponent;
  @Input() licacaoId: number | string | undefined;
  @Output('afterSave') afterSave = new EventEmitter<ServicoEntity>();

  form = new FormGroup({
    id: new FormControl(''),
    servico: new FormControl('', [Validators.required]),
    subTotal: new FormControl('', [Validators.required]),
  })

  public listServicos: ServicoEntity[] = [];

  constructor(private service: GenericService) { }

  ngOnInit(): void {
  }

  open(data?: ServicoEntity) {
    if (!!data) {
      this.service.get(LOCACAO_SERVICOS + '/' + data.id).subscribe(
        resp => {
          this.form.controls['servico'].disable();
          this.form.patchValue(resp.data)
          if (!!resp.data.servico) {
            this.listServicos = [resp.data.servico]
          }
          this.modal.open();
        }
      )
    } else {
      this.service.get(SERVICO).subscribe(
        resp => {
          this.listServicos = resp.data;
          this.modal.open();
        }
      )
    }
  }

  close() {
    this.modal.close()
  }

  clear() {
    this.form.reset('');
    this.form.controls['servico'].enable();
  }

  save(openAfterSave = false) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.value;
    const locacao = { id: this.licacaoId }
    let request: any

    if (!!form.id) {
      request = this.service.put(LOCACAO_SERVICOS, { ...form, locacao })
    } else {
      request = this.service.post(LOCACAO_SERVICOS, { ...form, locacao })
    }

    request.subscribe((resp: ServicoEntity) => {
      this.afterSave.emit(resp)

      if (openAfterSave) {
        this.clear()
      } else {
        this.afterSave.emit(resp)
        this.close()
      }
    })
  }

  findServicos(nome: string) {
    this.service.get(SERVICO_FILTER, { params: { nome } }).subscribe(
      resp => {
        this.listServicos = resp.data;
      }
    )
  }

  setValorBase(lancamento: ServicoEntity[]) {
    this.form.patchValue({
      subTotal: lancamento[0].valorBase
    })
  }
}
