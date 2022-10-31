import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissoesMainComponent } from './permissoes-main/permissoes-main.component';
import { PermissoesInsertEditComponent } from './permissoes-insert-edit/permissoes-insert-edit.component';
import {UiModule} from "../../../shared/ui/ui.module";
import {DgCrudModule} from "@datagrupo/dg-crud";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PermissoesMainComponent,
    PermissoesInsertEditComponent
  ],
    imports: [
        CommonModule,
        UiModule,
        DgCrudModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class PermissoesModule { }
