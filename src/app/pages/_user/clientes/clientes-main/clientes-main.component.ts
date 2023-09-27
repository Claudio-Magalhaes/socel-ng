import { Component, OnInit } from '@angular/core';
import {ClientesEntity} from "../clientes.entity";
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";

@Component({
  selector: 'app-clientes-main',
  templateUrl: './clientes-main.component.html',
  styleUrls: ['./clientes-main.component.scss']
})
export class ClientesMainComponent implements OnInit {

  public entity = new ClientesEntity();
  public table: CdkDynamicTable.tableClass

  constructor(public cdkTable: CdkDynamicTableService) {
    this.table = cdkTable.createByCrudEnity2(new ClientesEntity())
  }

  ngOnInit(): void {
  }

}
