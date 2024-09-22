import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHomeComponent } from './site-home/site-home.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    SiteHomeComponent,
    LoginComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class PublicModule { }
