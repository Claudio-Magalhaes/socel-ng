import { Component, OnInit } from '@angular/core';
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {PermissaoEntity} from "../permissao.entity";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {PERMISSAO} from "../../../../_core/endpoints";

@Component({
  selector: 'app-permissoes-insert-edit',
  templateUrl: './permissoes-insert-edit.component.html',
  styleUrls: ['./permissoes-insert-edit.component.scss']
})
export class PermissoesInsertEditComponent extends AbstractInsertEdit2<PermissaoEntity> implements OnInit {

  rootEntity = new PermissaoEntity();

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required])
  })

  constructor(public config: InsertEditConfig2) {
    super(config)
  }

  override ngOnInit(): void {
    super.ngOnInit()
  }

  override afterFetchEntity(entityData: any) {
    this.form.patchValue(entityData);
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
