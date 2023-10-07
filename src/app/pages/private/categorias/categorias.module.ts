import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaMainComponent } from './categoria-main/categoria-main.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {
    CdkDynamicGroupModule,
    CdkDynamicTableModule, DgModalModule, DgPaginatorModule,
    DgTableModule
} from "@datagrupo/dg-ng-util";
import { ModalCategoriaInsertEditComponent } from './modal-categoria-insert-edit/modal-categoria-insert-edit.component';



@NgModule({
  declarations: [
    CategoriaMainComponent,
    ModalCategoriaInsertEditComponent
  ],
    imports: [
        CommonModule,
        UiModule,
        DgCrudModule,
        RouterModule,
        ReactiveFormsModule,
        DgTableModule,
        CdkDynamicTableModule,
        DgPaginatorModule,
        CdkDynamicGroupModule,
        DgModalModule,
    ]
})
export class CategoriasModule { }
