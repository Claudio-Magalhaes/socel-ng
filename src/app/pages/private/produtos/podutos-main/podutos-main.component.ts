import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProdutosEntity} from "../produtos.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup} from "@angular/forms";
import {ProdutosTable} from "../produtos.table";

@Component({
  selector: 'app-podutos-main',
  templateUrl: './podutos-main.component.html',
  styleUrls: ['./podutos-main.component.scss']
})
export class PodutosMainComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    nome: new FormControl(''),
    status: new FormControl(''),
  })

  table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService
  ) {
    this.table = CdkTable.createByCrudEnity2(new ProdutosEntity(), ProdutosTable)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.table.destroy()
  }

}
