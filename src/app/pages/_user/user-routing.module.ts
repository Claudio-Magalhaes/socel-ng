import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardMainComponent} from "./dashboard/dashboard-main/dashboard-main.component";
import {ClientesMainComponent} from "./clientes/clientes-main/clientes-main.component";
import {ClientesInsertEditComponent} from "./clientes/clientes-insert-edit/clientes-insert-edit.component";
import {PodutosMainComponent} from "./produtos/podutos-main/podutos-main.component";
import {PodutosInsertEditComponent} from "./produtos/podutos-insert-edit/podutos-insert-edit.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent
  },


  {
    path: 'clientes',
    component: ClientesMainComponent
  },
  {
    path: 'clientes',
    children: [
      { path: ':id', component:  ClientesInsertEditComponent}
    ]
  },
  {
    path: 'produtos',
    component: PodutosMainComponent
  },
  {
    path: 'produtos',
    children: [
      { path: ':id', component:  PodutosInsertEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
