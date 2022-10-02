import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SiteHomeComponent} from "./pages/_public/site-home/site-home.component";
import {DashboardComponent} from "./pages/_user/dashboard/dashboard.component";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";

const routes: Routes = [

  {
    path: '',
    component: SiteHomeComponent
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    loadChildren: () =>
      import('./pages/_user/user.module').then((m) => m.UserModule)
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
