import { Component, OnInit } from '@angular/core';
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {CategoriasEntity} from "../categorias.entity";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categoria-insert-edit',
  templateUrl: './categoria-insert-edit.component.html',
  styleUrls: ['./categoria-insert-edit.component.scss']
})
export class CategoriaInsertEditComponent extends AbstractInsertEdit2<CategoriasEntity> implements OnInit {

  rootEntity = new CategoriasEntity()

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    disponivelSite: new FormControl('')
  })

  constructor(public config: InsertEditConfig2) {
    super(config)
  }

  override ngOnInit(): void {
    super.ngOnInit();
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
