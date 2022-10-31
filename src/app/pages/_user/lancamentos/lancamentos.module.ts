import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosInsertEditComponent } from './lancamentos-insert-edit/lancamentos-insert-edit.component';
import { LancamentosMainComponent } from './lancamentos-main/lancamentos-main.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import { ModalLancamentoComponent } from './sub-componsnts/modal-lancamento/modal-lancamento.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LancamentosInsertEditComponent,
    LancamentosMainComponent,
    ModalLancamentoComponent
  ],
    imports: [
        CommonModule,
        UiModule,
        DgCrudModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class LancamentosModule { }
