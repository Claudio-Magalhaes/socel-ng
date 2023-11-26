import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import {CdkDynamicTableModule, DgPaginatorModule, DgTableModule} from "@datagrupo/dg-ng-util";
import {UiModule} from "../../../shared/ui/ui.module";
import {LancamentosModule} from "../lancamentos/lancamentos.module";



@NgModule({
  declarations: [
    DashboardMainComponent
  ],
    imports: [
        CommonModule,
        CdkDynamicTableModule,
        UiModule,
        DgTableModule,
        DgPaginatorModule,
        LancamentosModule
    ]
})
export class DashboardModule { }
