import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SiteHomeComponent} from "./pages/public/site-home/site-home.component";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";
import {PrintLocacaoComponent} from "./pages/private/locacao/sub-components/print-locacao/print-locacao.component";
import {SessionGuard} from "./_core/guards/session/session.guard";
import {LoginComponent} from "./pages/public/login/login.component";
import {PublicLayoutComponent} from "./layouts/public-layout/public-layout/public-layout.component";

const routes: Routes = [

  {
    path: 'user/locacoes/imprimir/:id',
    component: PrintLocacaoComponent,
  },

  // {
  //   path: '',
  //   component: SiteHomeComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: '',
    component: PublicLayoutComponent,
    loadChildren: () =>
      import('./pages/public/public.module').then((m) => m.PublicModule)
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('./pages/private/user.module').then((m) => m.UserModule)
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
