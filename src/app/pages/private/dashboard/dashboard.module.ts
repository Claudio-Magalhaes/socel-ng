import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import {
    CdkDynamicGroupModule,
    CdkDynamicTableModule,
    DgAutocomplete2Module,
    DgPaginatorModule,
    DgTableModule
} from "@datagrupo/dg-ng-util";
import {UiModule} from "../../../shared/ui/ui.module";
import {LancamentosModule} from "../lancamentos/lancamentos.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardLocacoesComponent } from './sub-components/dashboard-locacoes/dashboard-locacoes.component';



@NgModule({
  declarations: [
    DashboardMainComponent,
    DashboardLocacoesComponent
  ],
    imports: [
        CommonModule,
        CdkDynamicTableModule,
        UiModule,
        DgTableModule,
        DgPaginatorModule,
        LancamentosModule,
        CdkDynamicGroupModule,
        FormsModule,
        ReactiveFormsModule,
        DgAutocomplete2Module
    ]
})
export class DashboardModule { }
