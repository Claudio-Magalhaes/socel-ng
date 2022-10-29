import { Component, OnInit } from '@angular/core';
import {AbstractInsertEdit, InsertEditConfig} from "@datagrupo/dg-crud";
import {ProdutosEntity} from "../produtos.entity";
import {ConfigDgCrudService} from "../../../../_core/config/config-dg-crud/config-dg-crud.service";
import {environment} from "../../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PRODUTOS} from "../../../../_core/endpoints";

@Component({
  selector: 'app-podutos-insert-edit',
  templateUrl: './podutos-insert-edit.component.html',
  styleUrls: ['./podutos-insert-edit.component.scss']
})
export class PodutosInsertEditComponent extends AbstractInsertEdit<ProdutosEntity> implements OnInit {

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    estoqueAtual: new FormControl(''),
    alertaEstoqueMinimo: new FormControl(''),
    disponivelSite: new FormControl(''),
    descricao: new FormControl(''),
  })

  constructor(public config: InsertEditConfig) {
    super(config, { path: environment.apiUrl, context: PRODUTOS })
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  initNewEntity(): void {
    this.entity = new ProdutosEntity();
  }

  override afterFetchEntity() {
    this.form.patchValue({...this.entity})
  }

  override beforeSaveEntity(): boolean {
    if(this.form.invalid) {
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
