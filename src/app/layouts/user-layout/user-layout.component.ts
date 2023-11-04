import {Component, HostListener, OnInit} from '@angular/core';
import {InterfaceMenuList} from "./components/navigation/navigation.component";
import Swal from "sweetalert2";
import {CdkAbstractInsertEdit} from "@datagrupo/dg-crud";

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

  @HostListener('window:crud-callback-message', ['$event'])
  crudCallbackMessage(ev: CustomEvent<CdkAbstractInsertEdit.crudCallbackMessage>) {
    const data = ev.detail;
    if (data.origin == 'dg-crud') {
      if (!!data.message?.status) {
        Swal.fire({
          icon: !!data.message?.status ? 'success' :'warning',
          title: data.message?.title || '',
          text: data.message?.text || ''
        }).then()
      } else {
        Swal.fire({
          icon: !!data.message?.message?.status ? 'success' :'warning',
          title: data.message?.message?.title || '',
          text: data.message?.message?.text || ''
        }).then()
      }
      return;
    } else {
      if (!data['message']) return;
      if (!data['message']['error']) return;
      if (!data['message']['error']['message']) return;


      Swal.fire({
        icon: 'warning',
        title: data['message']['error']['message']
      }).then()

      console.log(data['message']['error']['message'])


    }
    // console.log(data)
  }
}
