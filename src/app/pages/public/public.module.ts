import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SiteHomeComponent} from './site-home/site-home.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {PublicRoutingModule} from "./public-routing.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    SiteHomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class PublicModule {
}
