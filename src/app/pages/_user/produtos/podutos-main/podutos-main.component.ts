import { Component, OnInit } from '@angular/core';
import {ProdutosEntity} from "../produtos.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-podutos-main',
  templateUrl: './podutos-main.component.html',
  styleUrls: ['./podutos-main.component.scss']
})
export class PodutosMainComponent implements OnInit {

  table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = CdkTable.createByCrudEnity2(new ProdutosEntity(), {
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: ProdutosEntity) => {
            this.router.navigate(['user', 'produtos', val?.id])
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
