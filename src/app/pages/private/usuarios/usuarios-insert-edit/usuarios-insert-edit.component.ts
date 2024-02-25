import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuariosEntity} from "../usuarios.entity";
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {GenericService} from "../../../../services/generic-service/generic.service";

@Component({
  selector: 'app-usuarios-insert-edit',
  templateUrl: './usuarios-insert-edit.component.html',
  styleUrls: ['./usuarios-insert-edit.component.scss']
})
export class UsuariosInsertEditComponent extends AbstractInsertEdit2<UsuariosEntity> implements OnInit {

  rootEntity = new UsuariosEntity();

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    telefone: new FormControl(''),
  })

  public listPermission: UsuariosEntity[] = [];

  constructor(
    public config: InsertEditConfig2,
    public service: GenericService
  ) {
    super(config);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override afterFetchEntity() {
    console.log(this.entity)
    debugger
    this.form.patchValue({
      ...this.entity
    })
  }

  override beforeSaveEntity(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    const form = this.form.value;

    this.entity = {
      ...this.entity,
      ...form,
    }

    return true;
  }

}
