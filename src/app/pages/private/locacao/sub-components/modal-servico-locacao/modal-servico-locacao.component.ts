import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DgModalComponent} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {LOCACAO_SERVICOS, PRODUTOS, SERVICO} from "../../../../../_core/endpoints";
import {ServicoEntity} from "../../../servicos/servico.entity";

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
    this.service.get(SERVICO).subscribe(
      resp => {
        this.listServicos = resp.data;
      }
    )

    if (!!data) {
      this.service.get(PRODUTOS, { params: { id: data.id } }).subscribe(
        resp => {
          this.form.patchValue(resp)
        }
      )
    } else {
      this.modal.open();
    }
  }

  close() {
    this.modal.close()
  }

  clear() {
    this.form.reset('');
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


}
