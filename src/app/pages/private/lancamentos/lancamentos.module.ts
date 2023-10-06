import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LancamentosMainComponent} from './lancamentos-main/lancamentos-main.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ModalLancamentoComponent} from './sub-componsnts/modal-lancamento/modal-lancamento.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CdkDynamicTableModule, DgModalModule, DgPaginatorModule, DgTableModule} from "@datagrupo/dg-ng-util";


@NgModule({
  declarations: [
    LancamentosMainComponent,
    ModalLancamentoComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DgCrudModule,
    RouterModule,
    ReactiveFormsModule,
    DgModalModule,
    DgPaginatorModule,
    CdkDynamicTableModule,
    DgTableModule
  ]
})
export class LancamentosModule {
}
