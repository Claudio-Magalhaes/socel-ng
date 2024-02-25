import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHomeComponent } from './site-home/site-home.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SiteHomeComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class PublicModule { }
