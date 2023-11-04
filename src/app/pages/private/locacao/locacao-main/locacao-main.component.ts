import { Component, OnInit } from '@angular/core';
import {LocacaoEntity} from "../locacao.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {LOCACAO} from "../../../../_core/endpoints";
import {LocacaoService} from "../service/locacao.service";
import {LocacaoFilters} from "../locacao.filters";
import {classesStatus} from "../locacao.table";

@Component({
  selector: 'app-locacao-main',
  templateUrl: './locacao-main.component.html',
  styleUrls: ['./locacao-main.component.scss']
})
export class LocacaoMainComponent implements OnInit {

  table: CdkDynamicTable.tableClass;

  filters = {
    nomeCliente: '',
    status: '',
    dataInicial: '',
    dataFinal: '',
  }

  constructor(
    private CdkTable: CdkDynamicTableService,
    private router: Router,
    private service: LocacaoService
  ) {
    this.table = CdkTable.createByCrudEnity2(new LocacaoEntity(), {
      filters: { group: 'locacoes', reactive: true, filters: LocacaoFilters },
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: LocacaoEntity) => {
            this.router.navigate(['user', 'locacoes', val?.id]).then()
          },
          permission: row => {
            return row.status == 'ABERTO';
          }
        },
        ver: {
          name: 'Ver',
          dbClick: true,
          action: (val: LocacaoEntity) => {
            this.router.navigate(['user', 'locacoes', val?.id]).then()
          },
          permission: row => {
            return row.status != 'ABERTO';
          }
        },
        iniciar: {
          name: 'Iniciar locação',
          action: (row) => {
            this.service.iniciar(row.id, () => this.table.find())
          },
          permission: (row) => {
            return row.status == 'ABERTO'
          }
        },
        finalizar: {
          name: 'Finalizar locação',
          action: (row) => {
            this.service.finalizar(row.id, () => this.table.find())
          },
          permission: (row) => {
            return row.status == 'EM_LOCACAO'
          }
        },
        cancelar: {
          name: 'Iniciar locação',
          action: (row) => {

          },
          permission: (row) => {
            return row.status == 'Aberto'
          }
        }
      }
    });
    this.table.controls.columns.update('id', { tdClass: classesStatus })
    this.table.controls.columns.update('cliente', { tdClass: classesStatus })
    this.table.controls.columns.update('dataInicial', { tdClass: classesStatus })
    this.table.controls.columns.update('dataFinal', { tdClass: classesStatus })
    this.table.controls.columns.update('status', { tdClass: classesStatus })
    this.table.controls.columns.update('total', { tdClass: classesStatus })
    this.table.controls.columns.update('faturamento', { tdClass: classesStatus })
  }

  ngOnInit(): void {
  }

}
