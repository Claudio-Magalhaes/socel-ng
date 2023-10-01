import { Component, OnInit } from '@angular/core';
import {LocacaoEntity} from "../locacao.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-locacao-main',
  templateUrl: './locacao-main.component.html',
  styleUrls: ['./locacao-main.component.scss']
})
export class LocacaoMainComponent implements OnInit {

  table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = CdkTable.createByCrudEnity2(new LocacaoEntity(), {
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: LocacaoEntity) => {
            this.router.navigate(['user', 'locacoes', val?.id]).then()
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
