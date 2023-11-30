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
    this.table = CdkTable.createByEntity(new ServicoEntity())
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.table.destroy();
  }

}
