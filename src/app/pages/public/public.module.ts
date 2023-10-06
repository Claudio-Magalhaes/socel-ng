import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHomeComponent } from './site-home/site-home.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    SiteHomeComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class PublicModule { }
