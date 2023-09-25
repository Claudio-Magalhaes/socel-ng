import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosMainComponent } from './servicos-main/servicos-main.component';
import { ServicosInsertEditComponent } from './servicos-insert-edit/servicos-insert-edit.component';
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
    ServicosMainComponent,
    ServicosInsertEditComponent
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
export class ServicosModule { }
