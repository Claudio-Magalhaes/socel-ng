import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {LocacaoEntity} from "../../locacao/locacao.entity";
import {LocacaoTable} from "../../locacao/locacao.table";

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, OnDestroy {

  public locacoesAtrazadas!: CdkDynamicTable.tableClass;
  public locacoesVencendo!: CdkDynamicTable.tableClass;
  public locacoesNaoFaturada!: CdkDynamicTable.tableClass;

  constructor(private createTable: CdkDynamicTableService) {
    this.createTables();
  }

  createTables() {
    this.locacoesAtrazadas = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        params: { atrazadas: true }
      }
    })
    this.locacoesAtrazadas.controls.columns.remove('dataInicial')
    this.locacoesAtrazadas.controls.columns.remove('lancamento')
    this.locacoesAtrazadas.controls.columns.remove('total')

    this.locacoesVencendo = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        params: { atrazada: true }
      }
    })
    this.locacoesVencendo.controls.columns.remove('dataInicial')
    this.locacoesVencendo.controls.columns.remove('lancamento')
    this.locacoesVencendo.controls.columns.remove('total')

    this.locacoesNaoFaturada = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        params: { naoFaturada: true }
      }
    })
    this.locacoesNaoFaturada.controls.columns.remove('dataInicial')
    this.locacoesNaoFaturada.controls.columns.remove('lancamento')
    this.locacoesNaoFaturada.controls.columns.remove('total')
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.locacoesAtrazadas.destroy()
  }

}
