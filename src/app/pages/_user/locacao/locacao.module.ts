import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocacaoMainComponent } from './locacao-main/locacao-main.component';
import { LocacaoInsertEditComponent } from './locacao-insert-edit/locacao-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    LocacaoMainComponent,
    LocacaoInsertEditComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DgCrudModule,
    RouterModule
  ]
})
export class LocacaoModule { }
