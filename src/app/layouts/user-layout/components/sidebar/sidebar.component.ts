import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {InterfaceMenuList} from "../navigation/navigation.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public listMenuAdm: InterfaceMenuList[] = [
    {url: '/admin', nome: 'Admin', icon: 'settings', subMenu: [
        { url: '/admin', nome: 'config', icon: 'admin_panel_settings' }
    ]}
  ];
  public listNavigationAdmin = [
    {url: '/teste', nome: 'Sidebar', icon: 'settings'},
    {
      nome: 'Components', url: '/user', icon: 'settings', subMenu: [
        {url: '/user/teste1', nome: 'teste 1', icon: 'settings'},
        {url: '/user/teste2', nome: 'teste 2', icon: 'settings'},
        {url: '/user/teste3', nome: 'teste 3', icon: 'settings'},
        {url: '/user/teste4', nome: 'teste 4', icon: 'settings'},
        {
          url: '/user/teste5', nome: 'teste 5', icon: 'settings', subMenu: [
            {url: '/user/teste1', nome: 'SUBMENU 1', icon: 'settings'},
            {url: '/user/teste2', nome: 'SUBMENU 2', icon: 'settings'},
            {url: '/user/teste3', nome: 'SUBMENU 3', icon: 'settings'},
            {url: '/user/teste4', nome: 'SUBMENU 4', icon: 'settings'},
            {
              url: '/user/teste5', nome: 'SUBMENU 5', icon: 'settings', subMenu: [
                {url: '/user/teste1', nome: 'SUBMENU-SUBMENU 1', icon: 'settings'},
                {url: '/user/teste2', nome: 'SUBMENU-SUBMENU 2', icon: 'settings'},
                {url: '/user/teste3', nome: 'SUBMENU-SUBMENU 3', icon: 'settings'},
                {url: '/user/teste4', nome: 'SUBMENU-SUBMENU 4', icon: 'settings'},
                {url: '/user/teste5', nome: 'SUBMENU-SUBMENU 5', icon: 'settings'}
              ]
            }
          ]
        }
      ]
    }
  ];

  public static open = true;
  public _open = true;
  public showBackground = true;
  public closeClickBackground = true;

  public halfCollapse = 'md';
  public collapse = 'sm';

  constructor() {
    if (!!window.localStorage.getItem('dg-sidebar-state')) {
      SidebarComponent.open = Boolean(Number(window.localStorage.getItem('dg-sidebar-state')))
      this._open = SidebarComponent.open;
    }
  }

  ngOnInit() {
  }

  changeState() {
    if (window.innerWidth > 991) {
      window.localStorage.setItem('dg-sidebar-state', !SidebarComponent.open ? '1' : '0');
    }

    SidebarComponent.open = !SidebarComponent.open;
    this._open = SidebarComponent.open;
  }

  bgChangeState(){
    if (this.closeClickBackground) {
      this.changeState();
    }
  }

}
