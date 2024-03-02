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
import {LocacaoModule} from "./locacao/locacao.module";
import {LancamentosModule} from "./lancamentos/lancamentos.module";
import {SessionService} from "../../services/session-service/session.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AddTokenInterceptor} from "../../_core/interceptors/add-token/add-token.interceptor";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    DashboardModule,
    ClientesModule,
    CategoriasModule,
    ProdutosModule,
    LocacaoModule,
    LancamentosModule,
    ServicosModule,
    UsuariosModule,
    PermissoesModule,
    // DadosEmpresaModule
  ],
  providers: [
    SessionService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ]
})
export class UserModule { }
