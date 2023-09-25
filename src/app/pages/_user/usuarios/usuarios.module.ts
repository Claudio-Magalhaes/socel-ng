import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosMainComponent } from './usuarios-main/usuarios-main.component';
import { UsuariosInsertEditComponent } from './usuarios-insert-edit/usuarios-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {
  CdkDynamicTableModule,
  DgPaginatorModule, DgTableModule
} from "dg-ng-util";



@NgModule({
  declarations: [
    UsuariosMainComponent,
    UsuariosInsertEditComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DgCrudModule,
    RouterModule,
    ReactiveFormsModule,
    DgPaginatorModule,
    CdkDynamicTableModule,
    DgTableModule
  ]
})
export class UsuariosModule { }
