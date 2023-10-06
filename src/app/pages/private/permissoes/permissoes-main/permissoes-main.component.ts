import { Component, OnInit } from '@angular/core';
import {PermissaoEntity} from "../permissao.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-permissoes-main',
  templateUrl: './permissoes-main.component.html',
  styleUrls: ['./permissoes-main.component.scss']
})
export class PermissoesMainComponent implements OnInit {

  table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = CdkTable.createByCrudEnity2(new PermissaoEntity(), {
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: PermissaoEntity) => {
            this.router.navigate(['user', 'configuracoes', 'permissoes', val?.id]).then()
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
