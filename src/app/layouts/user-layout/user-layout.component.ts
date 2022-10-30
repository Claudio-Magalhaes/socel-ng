import { Component, OnInit } from '@angular/core';
import {InterfaceMenuList} from "./components/navigation/navigation.component";

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  public navigateMenu: InterfaceMenuList[] = [
    {
      url: '/user',
      icon: 'dashboard',
      nome: 'Dashboard'
    },
    {
      url: '/user/clientes',
      icon: 'group',
      nome: 'clientes'
    },
    {
      url: '/user/produtos',
      icon: 'qr_code_2',
      nome: 'Produtos'
    },
    {
      url: '/user/categorias',
      icon: 'category',
      nome: 'Categorias'
    },
    {
      url: '/user/locacoes',
      icon: 'category',
      nome: 'Locações'
    },
    {
      url: '/user/lancamentos',
      icon: 'payments',
      nome: 'Lançamentos'
    },
    {
      url: '/user/servicos',
      icon: 'build',
      nome: 'serviçoes'
    },
    {
      url: '/configuracoes',
      icon: 'settings',
      nome: 'Configurações',
      subMenu: [
        { url: '/user/configuracoes/usuarios', icon: 'manage_accounts', nome: 'Usuários' },
        { url: '/user/configuracoes/permissoes', icon: 'badge', nome: 'Permissões' },
        { url: '/user/configuracoes/dados-da-empresa', icon: 'description', nome: 'Dados da Empresa' }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
