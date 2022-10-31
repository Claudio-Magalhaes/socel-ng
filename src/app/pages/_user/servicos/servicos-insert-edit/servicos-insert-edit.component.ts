import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AbstractInsertEdit, InsertEditConfig} from "@datagrupo/dg-crud";
import {ServicoEntity} from "../servico.entity";
import {environment} from "../../../../../environments/environment";
import {SERVICO} from "../../../../_core/endpoints";

@Component({
  selector: 'app-servicos-insert-edit',
  templateUrl: './servicos-insert-edit.component.html',
  styleUrls: ['./servicos-insert-edit.component.scss']
})
export class ServicosInsertEditComponent extends AbstractInsertEdit<ServicoEntity> implements OnInit {

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    valorBase: new FormControl('', [Validators.required]),
    descricao: new FormControl(''),
  })

  constructor(
    public config: InsertEditConfig
  ) {
    super(config, { path: environment.apiUrl, context: SERVICO })
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  initNewEntity(): void {
    this.entity = new ServicoEntity();
  }

  override afterFetchEntity() {
    this.form.patchValue({...this.entity})
  }

  override beforeSaveEntity(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    this.entity = {
      ...this.entity,
      ...this.form.value
    }

    return true;
  }

}
