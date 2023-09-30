import {Component, OnInit} from '@angular/core';
import {ClientesEntity} from "../clientes.entity";
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {clienteFilters} from "../cliente.filters";

@Component({
  selector: 'app-clientes-main',
  templateUrl: './clientes-main.component.html',
  styleUrls: ['./clientes-main.component.scss']
})
export class ClientesMainComponent implements OnInit {

  form = new FormGroup({
    nome: new FormControl('')
  })

  public entity = new ClientesEntity();
  public table: CdkDynamicTable.tableClass

  constructor(
    public cdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = cdkTable.createByCrudEnity2(new ClientesEntity(), {
      actions: {
        editar: {
          name: 'Editar', dbClick: true, action: val => {
            this.router.navigate(['user', 'clientes', val.id]).then()
          }
        }
      },
      // group: { group: 'clientes' },
    })
    this.table.controls.filters.start('clientes')
    this.table.controls.filters.setObject(clienteFilters)
  }

  ngOnInit(): void {
  }

}
