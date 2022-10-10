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
      url: 'user/produtos',
      icon: 'home',
      nome: 'Produtos'
    },
    {
      url: 'user/locacoes',
      icon: 'home',
      nome: 'Locações'
    },
    {
      url: 'user/lancamentos',
      icon: 'home',
      nome: 'Lançamentos'
    },
    {
      url: 'user/servicos',
      icon: 'home',
      nome: 'serviçoes'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
