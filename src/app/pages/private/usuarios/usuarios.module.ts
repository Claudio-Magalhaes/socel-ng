import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosMainComponent } from './usuarios-main/usuarios-main.component';
import { UsuariosInsertEditComponent } from './usuarios-insert-edit/usuarios-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  CdkDynamicTableModule,
  DgPaginatorModule, DgTableModule
} from "@datagrupo/dg-ng-util";
import {NgxMaskModule} from "ngx-mask";



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
        DgTableModule,
        NgxMaskModule,
        FormsModule
    ]
})
export class UsuariosModule { }
