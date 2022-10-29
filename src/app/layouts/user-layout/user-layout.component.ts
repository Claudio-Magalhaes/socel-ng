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
      icon: 'home',
      nome: 'Dashboard'
    },
    {
      url: '/user/clientes',
      icon: 'home',
      nome: 'clientes'
    },
    {
      url: '/user/produtos',
      icon: 'home',
      nome: 'Produtos'
    },
    {
      url: '/user/categorias',
      icon: 'home',
      nome: 'Categorias'
    },
    {
      url: '/user/locacoes',
      icon: 'home',
      nome: 'Locações'
    },
    {
      url: '/user/lancamentos',
      icon: 'home',
      nome: 'Lançamentos'
    },
    {
      url: '/user/servicos',
      icon: 'home',
      nome: 'serviçoes'
    },
    {
      url: '/configuracoes',
      icon: 'home',
      nome: 'Configurações',
      subMenu: [
        { url: '/user/configuracoes/usuarios', icon: 'home', nome: 'Usuários' },
        { url: '/user/configuracoes/permissoes', icon: 'home', nome: 'Permissões' },
        { url: '/user/configuracoes/dados-da-empresa', icon: 'home', nome: 'Dados da Empresa' }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
