import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LancamentosMainComponent} from './lancamentos-main/lancamentos-main.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ModalLancamentoComponent} from './sub-components/modal-lancamento/modal-lancamento.component';
import {ReactiveFormsModule} from "@angular/forms";
import {
    CdkDynamicGroupModule,
    CdkDynamicTableModule,
    DgModalModule,
    DgPaginatorModule,
    DgTableModule
} from "@datagrupo/dg-ng-util";
import { ModalBaixarComponent } from './sub-components/modal-baixar/modal-baixar.component';


@NgModule({
  declarations: [
    LancamentosMainComponent,
    ModalLancamentoComponent,
    ModalBaixarComponent
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
        DgTableModule,
        CdkDynamicGroupModule
    ]
})
export class LancamentosModule {
}
