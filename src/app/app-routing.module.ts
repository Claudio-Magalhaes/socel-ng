import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SiteHomeComponent} from "./pages/public/site-home/site-home.component";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";
import {PrintLocacaoComponent} from "./pages/private/locacao/sub-components/print-locacao/print-locacao.component";

const routes: Routes = [

  {
    path: 'user/locacoes/imprimir/:id',
    component: PrintLocacaoComponent
  },

  {
    path: '',
    component: SiteHomeComponent
  },
  {
    path: 'user',
    component: UserLayoutComponent,
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
