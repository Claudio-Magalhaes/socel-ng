import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientesMainComponent} from './clientes-main/clientes-main.component';
import {ClientesInsertEditComponent} from './clientes-insert-edit/clientes-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ClientesMainComponent,
    ClientesInsertEditComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DgCrudModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule {
}
