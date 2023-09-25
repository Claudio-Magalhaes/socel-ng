import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuariosEntity} from "../usuarios.entity";
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {environment} from "../../../../../environments/environment";
import {PERMISSAO, USUARIO} from "../../../../_core/endpoints";
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
    cpf: new FormControl('', [Validators.required]),
    permissao: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefone: new FormControl(''),
  })

  public listPermission: UsuariosEntity[] = [];

  constructor(
    public config: InsertEditConfig2,
    public service: GenericService
  ) {
    super(config, { path: environment.apiUrl, context: USUARIO });

    service.get(PERMISSAO).subscribe(
      resp => {
        this.listPermission = resp;
      }
    )
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override afterFetchEntity() {
    this.form.patchValue({
      ...this.entity,
      permissao: this.entity?.permissao
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
      permissao: form.permissao
    }

    return true;
  }

}
