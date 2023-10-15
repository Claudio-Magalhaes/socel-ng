import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DgModalComponent} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProdutosEntity} from "../../../produtos/produtos.entity";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {LOCACAO_PRODUTOS, PRODUTOS} from "../../../../../_core/endpoints";

@Component({
  selector: 'modal-produto-locacao',
  templateUrl: './modal-produto-locacao.component.html',
  styleUrls: ['./modal-produto-locacao.component.scss']
})
export class ModalProdutoLocacaoComponent implements OnInit {

  @ViewChild('modal') modal!: DgModalComponent;
  @Input() licacaoId: number | string | undefined;
  @Output('afterSave') afterSave = new EventEmitter<ProdutosEntity>();

  form = new FormGroup({
    id: new FormControl(''),
    produto: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
  })

  public listProdutos: ProdutosEntity[] = [];

  constructor(private service: GenericService) { }

  ngOnInit(): void {
  }

  open(data?: ProdutosEntity) {
    if (!!data) {
      this.service.get(LOCACAO_PRODUTOS + '/' + data.id).subscribe(
        resp => {
          this.form.controls['produto'].disable();
          this.form.patchValue({ ...resp.data })
          this.listProdutos = [new ProdutosEntity(1, 'teste')]
          this.modal.open()
        }
      )
    } else {
      this.service.get(PRODUTOS).subscribe(
        resp => {
          this.listProdutos = resp.data;
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
  }

  save(openAfterSave = false) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.value;
    let request: any

    if (!!form.id) {
      request = this.service.put(LOCACAO_PRODUTOS, {...form, locacao: this.licacaoId})
    } else {
      request = this.service.post(LOCACAO_PRODUTOS, {...form, locacao: this.licacaoId})
    }

    request.subscribe((resp: ProdutosEntity) => {
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
