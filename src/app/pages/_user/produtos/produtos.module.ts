import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodutosInsertEditComponent } from './podutos-insert-edit/podutos-insert-edit.component';
import { PodutosMainComponent } from './podutos-main/podutos-main.component';
import {DgCrudModule} from "@datagrupo/dg-crud";
import {UiModule} from "../../../shared/ui/ui.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PodutosInsertEditComponent,
    PodutosMainComponent
  ],
    imports: [
        CommonModule,
        DgCrudModule,
        UiModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class ProdutosModule { }
