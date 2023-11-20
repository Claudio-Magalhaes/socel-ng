import {Component, HostListener, OnInit} from '@angular/core';
import {InterfaceMenuList} from "./components/navigation/navigation.component";
import Swal from "sweetalert2";
import {CdkAbstractInsertEdit} from "@datagrupo/dg-crud";
import {generateActionRemove} from "../../_core/config/dg-ng-util/config-local-dynamic-table";
import {Router} from "@angular/router";
import {GenericService} from "../../services/generic-service/generic.service";
import {DynamicGroupClass} from "@datagrupo/dg-ng-util";

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

  constructor(
    private router: Router,
    private service: GenericService,
  ) { }

  ngOnInit(): void {
  }

  /**#############################################################
   * ##### METODOS GLOBAIS
   #############################################################*/

  /**
   * Metodo de action da tabela
   * Esse realiza um routerLink para a rota recebida
   * @param ev
   */
  @HostListener('window:default-actions-dg-tables-router', ['$event'])
  defaultFunctionsDgTablesRouter(ev: CustomEvent<(string | number)[]>) {
    this.router.navigate(ev.detail).then(() => {
      window.scrollTo({ top: 0 });
    })
  }

  //TODO criar ajuste para multiplos ids
  /**
   * Metodo de action da tabela
   * Esse realiza a exclusão de um ou mais registros
   * Verifique os dados em "<generateActionRemove>"
   * @param ev
   */
  @HostListener('window:default-actions-dg-tables-remove', ['$event'])
  defaultFunctionsDgTablesRemove(ev: CustomEvent<generateActionRemove>) {
    const data = ev.detail
    Swal.fire({
      icon: 'question',
      title: data.messageBefore?.title || 'Remover Registro',
      text: data.messageBefore?.text || 'Deseja remover esse registro',
      showCancelButton: true
    }).then(confirm => {
      if (confirm.isConfirmed){
        if (confirm.isConfirmed){
          this.service.delete(data.url + '/' + data.id, {  }).subscribe(
            () => {
              if (data.callback) {
                if (typeof data.callback == 'string') {
                  if (!data.callback) return;
                  DynamicGroupClass.dispacherFilter(data.callback)
                } else {
                  data.callback();
                }
              }
              Swal.fire({
                icon: 'success',
                title: data.messageAfter?.title || 'Registro remover',
                text: data.messageAfter?.text || 'O registro foi remover com sucesso!',
                timer: 3000
              }).then()
            }
          )
        }
      }
    })
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
