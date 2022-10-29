import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaMainComponent } from './categoria-main/categoria-main.component';
import { CategoriaInsertEditComponent } from './categoria-insert-edit/categoria-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CategoriaMainComponent,
    CategoriaInsertEditComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DgCrudModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CategoriasModule { }
