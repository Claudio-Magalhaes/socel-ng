import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientesMainComponent} from './clientes-main/clientes-main.component';
import {ClientesInsertEditComponent} from './clientes-insert-edit/clientes-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {
  CdkDynamicTableModule, DgModalModule, DgPaginatorModule,
  DgTableModule
} from "dg-ng-util";
import {ContatosComponent} from "./sub-components/contatos/contatos.component";


@NgModule({
  declarations: [
    ClientesMainComponent,
    ClientesInsertEditComponent,
    // EnderecosComponent,
    ContatosComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DgCrudModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule,
    DgTableModule,
    CdkDynamicTableModule,
    DgModalModule,
    DgPaginatorModule
  ]
})
export class ClientesModule {
}
