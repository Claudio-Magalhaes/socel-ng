import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LancamentosMainComponent} from './lancamentos-main/lancamentos-main.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ModalLancamentoComponent} from './sub-components/modal-lancamento/modal-lancamento.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    CdkDynamicGroupModule,
    CdkDynamicTableModule, DgAutocomplete2Module,
    DgModalModule,
    DgPaginatorModule,
    DgTableModule
} from "@datagrupo/dg-ng-util";
import { ModalBaixarComponent } from './sub-components/modal-baixar/modal-baixar.component';
import {CustomInputsModule} from "../../../shared/custom-inputs/custom-inputs.module";


@NgModule({
    declarations: [
        LancamentosMainComponent,
        ModalLancamentoComponent,
        ModalBaixarComponent
    ],
    exports: [
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
        DgTableModule,
        CdkDynamicGroupModule,
        DgAutocomplete2Module,
        CustomInputsModule,
        FormsModule
    ]
})
export class LancamentosModule {
}
