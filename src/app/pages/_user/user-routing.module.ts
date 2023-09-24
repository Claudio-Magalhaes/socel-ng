import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardMainComponent} from "./dashboard/dashboard-main/dashboard-main.component";
import {ClientesMainComponent} from "./clientes/clientes-main/clientes-main.component";
// import {ClientesInsertEditComponent} from "./clientes/clientes-insert-edit/clientes-insert-edit.component";
// import {PodutosMainComponent} from "./produtos/podutos-main/podutos-main.component";
// import {PodutosInsertEditComponent} from "./produtos/podutos-insert-edit/podutos-insert-edit.component";
// import {CategoriaMainComponent} from "./categorias/categoria-main/categoria-main.component";
// import {CategoriaInsertEditComponent} from "./categorias/categoria-insert-edit/categoria-insert-edit.component";
// import {ServicosMainComponent} from "./servicos/servicos-main/servicos-main.component";
// import {ServicosInsertEditComponent} from "./servicos/servicos-insert-edit/servicos-insert-edit.component";
// import {LancamentosMainComponent} from "./lancamentos/lancamentos-main/lancamentos-main.component";
// import {LancamentosInsertEditComponent} from "./lancamentos/lancamentos-insert-edit/lancamentos-insert-edit.component";
// import {LocacaoMainComponent} from "./locacao/locacao-main/locacao-main.component";
// import {LocacaoInsertEditComponent} from "./locacao/locacao-insert-edit/locacao-insert-edit.component";
// import {UsuariosMainComponent} from "./usuarios/usuarios-main/usuarios-main.component";
// import {UsuariosInsertEditComponent} from "./usuarios/usuarios-insert-edit/usuarios-insert-edit.component";
// import {DadosEmpresaComponent} from "./dados-empresa/dados-empresa/dados-empresa.component";
// import {PermissoesMainComponent} from "./permissoes/permissoes-main/permissoes-main.component";
// import {PermissoesInsertEditComponent} from "./permissoes/permissoes-insert-edit/permissoes-insert-edit.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent
  },


  {
    path: 'clientes',
    component: ClientesMainComponent
  },
  // {
  //   path: 'clientes',
  //   children: [
      // { path: ':id', component:  ClientesInsertEditComponent}
    // ]
  // },
  // {
  //   path: 'produtos',
  //   component: PodutosMainComponent
  // },
  // {
  //   path: 'produtos',
  //   children: [
  //     { path: ':id', component:  PodutosInsertEditComponent}
  //   ]
  // },
  // {
  //   path: 'categorias',
  //   component: CategoriaMainComponent
  // },
  // {
  //   path: 'categorias',
  //   children: [
  //     { path: ':id', component:  CategoriaInsertEditComponent}
  //   ]
  // },
  // {
  //   path: 'servicos',
  //   component: ServicosMainComponent
  // },
  // {
  //   path: 'servicos',
  //   children: [
  //     { path: ':id', component:  ServicosInsertEditComponent}
  //   ]
  // },
  // {
  //   path: 'lancamentos',
  //   component: LancamentosMainComponent
  // },
  // {
  //   path: 'lancamentos',
  //   children: [
  //     { path: ':id', component:  LancamentosInsertEditComponent}
  //   ]
  // },
  //
  // {
  //   path: 'locacoes',
  //   component: LocacaoMainComponent
  // },
  // {
  //   path: 'locacoes',
  //   children: [
  //     { path: ':id', component: LocacaoInsertEditComponent}
  //   ]
  // },
  //
  // {
  //   path: 'configuracoes/usuarios',
  //   component: UsuariosMainComponent
  // },
  // {
  //   path: 'configuracoes/usuarios',
  //   children: [
  //     { path: ':id', component: UsuariosInsertEditComponent}
  //   ]
  // },
  //
  // {
  //   path: 'configuracoes/permissoes',
  //   component: PermissoesMainComponent
  // },
  // {
  //   path: 'configuracoes/permissoes',
  //   children: [
  //     { path: ':id', component: PermissoesInsertEditComponent}
  //   ]
  // },
  //
  // {
  //   path: 'configuracoes/dados-da-empresa',
  //   component: DadosEmpresaComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
