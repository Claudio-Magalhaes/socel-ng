import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {ClientesModule} from "./clientes/clientes.module";
import {CategoriasModule} from "./categorias/categorias.module";
import {ProdutosModule} from "./produtos/produtos.module";
import {ServicosModule} from "./servicos/servicos.module";
import {PermissoesModule} from "./permissoes/permissoes.module";
// import {CategoriasModule} from "./categorias/categorias.module";
// import {ProdutosModule} from "./produtos/produtos.module";
// import {LocacaoModule} from "./locacao/locacao.module";
// import {LancamentosModule} from "./lancamentos/lancamentos.module";
// import {ServicosModule} from "./servicos/servicos.module";
// import {UsuariosModule} from "./usuarios/usuarios.module";
// import {DadosEmpresaModule} from "./dados-empresa/dados-empresa.module";
// import {PermissoesModule} from "./permissoes/permissoes.module";



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
    // UsuariosModule,
    PermissoesModule,
    // DadosEmpresaModule
  ]
})
export class UserModule { }
