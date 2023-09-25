import { Component, OnInit } from '@angular/core';
import {UsuariosEntity} from "../usuarios.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "dg-ng-util";
import {ServicoEntity} from "../../servicos/servico.entity";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuarios-main',
  templateUrl: './usuarios-main.component.html',
  styleUrls: ['./usuarios-main.component.scss']
})
export class UsuariosMainComponent implements OnInit {

  public table: CdkDynamicTable.tableClass;

  constructor(
    private cdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = cdkTable.createByCrudEnity2(new UsuariosEntity(), {
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: ServicoEntity) => {
            this.router.navigate(['user', 'configuracoes', 'usuarios', val?.id])
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
