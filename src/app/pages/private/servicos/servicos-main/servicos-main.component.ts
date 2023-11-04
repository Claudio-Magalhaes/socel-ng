import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicoEntity} from "../servico.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-servicos-main',
  templateUrl: './servicos-main.component.html',
  styleUrls: ['./servicos-main.component.scss']
})
export class ServicosMainComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    nome: new FormControl(''),
    status: new FormControl(''),
  })

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
      },
      filters: { group: 'servicos', reactive: true, filters: {
        nome: { findFunc: val => { return { nome: val } } },
        status: { findFunc: val => { return { status: val } } }
        } }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.table.destroy();
  }

}
