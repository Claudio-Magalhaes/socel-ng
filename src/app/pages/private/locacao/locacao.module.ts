import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocacaoMainComponent } from './locacao-main/locacao-main.component';
import { LocacaoInsertEditComponent } from './locacao-insert-edit/locacao-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  CdkDynamicGroupModule,
  CdkDynamicTableModule, DgAutocomplete2Module, DgModalModule,
  DgPaginatorModule, DgTableModule
} from "@datagrupo/dg-ng-util";
import { ModalProdutoLocacaoComponent } from './sub-components/modal-produto-locacao/modal-produto-locacao.component';
import { ModalServicoLocacaoComponent } from './sub-components/modal-servico-locacao/modal-servico-locacao.component';
import {LancamentosModule} from "../lancamentos/lancamentos.module";
import {CustomInputsModule} from "../../../shared/custom-inputs/custom-inputs.module";
import { PrintLocacaoComponent } from './sub-components/print-locacao/print-locacao.component';



@NgModule({
  declarations: [
    LocacaoMainComponent,
    LocacaoInsertEditComponent,
    ModalProdutoLocacaoComponent,
    ModalServicoLocacaoComponent,
    PrintLocacaoComponent
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
        DgAutocomplete2Module,
        DgModalModule,
        FormsModule,
        CdkDynamicGroupModule,
        LancamentosModule,
        CustomInputsModule
    ]
})
export class LocacaoModule { }
