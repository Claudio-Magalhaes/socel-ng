import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientesMainComponent} from './clientes-main/clientes-main.component';
import {ClientesInsertEditComponent} from './clientes-insert-edit/clientes-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {
    CdkDynamicGroupModule,
    CdkDynamicTableModule, DgModalModule, DgPaginatorModule,
    DgTableModule
} from "@datagrupo/dg-ng-util";
import {ContatosComponent} from "./sub-components/contatos/contatos.component";
import {EnderecosComponent} from "./sub-components/enderecos/enderecos.component";


@NgModule({
  declarations: [
    ClientesMainComponent,
    ClientesInsertEditComponent,
    EnderecosComponent,
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
        DgPaginatorModule,
        CdkDynamicGroupModule,
        FormsModule
    ]
})
export class ClientesModule {
}
