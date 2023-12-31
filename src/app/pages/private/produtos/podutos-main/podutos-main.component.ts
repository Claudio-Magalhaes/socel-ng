import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProdutosEntity} from "../produtos.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup} from "@angular/forms";

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
    this.table = CdkTable.createByEntity(new ProdutosEntity())
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.table.destroy()
  }

}
