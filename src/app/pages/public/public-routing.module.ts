import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SiteHomeComponent} from "./site-home/site-home.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    component: SiteHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
