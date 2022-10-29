import { Component, OnInit } from '@angular/core';
import {AbstractInsertEdit, InsertEditConfig} from "@datagrupo/dg-crud";
import {CategoriasEntity} from "../categorias.entity";
import {environment} from "../../../../../environments/environment";
import {CATEGORIAS} from "../../../../_core/endpoints";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categoria-insert-edit',
  templateUrl: './categoria-insert-edit.component.html',
  styleUrls: ['./categoria-insert-edit.component.scss']
})
export class CategoriaInsertEditComponent extends AbstractInsertEdit<CategoriasEntity> implements OnInit {

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    disponivelSite: new FormControl('')
  })

  constructor(public config: InsertEditConfig) {
    super(config, { path: environment.apiUrl, context: CATEGORIAS })
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  initNewEntity(): void {
    this.entity = new CategoriasEntity();
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
