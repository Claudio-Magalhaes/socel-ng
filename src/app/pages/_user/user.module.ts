import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {ClientesModule} from "./clientes/clientes.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    DashboardModule,
    ClientesModule
  ]
})
export class UserModule { }
