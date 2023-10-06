import { Component, OnInit } from '@angular/core';
import {ProdutosEntity} from "../produtos.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {produtosFilters} from "../produtos.filters";

@Component({
  selector: 'app-podutos-main',
  templateUrl: './podutos-main.component.html',
  styleUrls: ['./podutos-main.component.scss']
})
export class PodutosMainComponent implements OnInit {

  form = new FormGroup({
    nome: new FormControl('')
  })

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
            this.router.navigate(['user', 'produtos', val?.id]).then()
          }
        }
      },
      filters: { group: 'produtos', filters: produtosFilters}
    })
  }

  ngOnInit(): void {
  }

}
