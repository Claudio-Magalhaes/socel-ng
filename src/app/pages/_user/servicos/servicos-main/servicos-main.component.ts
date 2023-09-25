import { Component, OnInit } from '@angular/core';
import {ServicoEntity} from "../servico.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "dg-ng-util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-servicos-main',
  templateUrl: './servicos-main.component.html',
  styleUrls: ['./servicos-main.component.scss']
})
export class ServicosMainComponent implements OnInit {

  table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = CdkTable.createByCrudEnity2(new ServicoEntity(), {
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: ServicoEntity) => {
            this.router.navigate(['user', 'servicos', val?.id]).then()
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
