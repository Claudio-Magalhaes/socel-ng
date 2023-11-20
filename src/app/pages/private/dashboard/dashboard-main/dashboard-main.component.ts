import { Component, OnInit } from '@angular/core';
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {LocacaoEntity} from "../../locacao/locacao.entity";
import {LocacaoTable} from "../../locacao/locacao.table";

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  public locacoesAtrazadas: CdkDynamicTable.tableClass;

  constructor(private createTable: CdkDynamicTableService) {
    this.locacoesAtrazadas = createTable.createByCrudEnity2(new LocacaoEntity(), LocacaoTable)
    this.locacoesAtrazadas.controls.columns.remove('dataInicial')
    this.locacoesAtrazadas.controls.columns.remove('lancamento')
    this.locacoesAtrazadas.controls.columns.remove('total')
  }

  ngOnInit(): void {
  }

}
