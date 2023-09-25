import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {ClientesModule} from "./clientes/clientes.module";
import {CategoriasModule} from "./categorias/categorias.module";
import {ProdutosModule} from "./produtos/produtos.module";
import {ServicosModule} from "./servicos/servicos.module";
import {PermissoesModule} from "./permissoes/permissoes.module";
import {UsuariosModule} from "./usuarios/usuarios.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    DashboardModule,
    ClientesModule,
    CategoriasModule,
    ProdutosModule,
    // LocacaoModule,
    // LancamentosModule,
    ServicosModule,
    UsuariosModule,
    PermissoesModule,
    // DadosEmpresaModule
  ]
})
export class UserModule { }
