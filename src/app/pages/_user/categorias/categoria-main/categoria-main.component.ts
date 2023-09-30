import {Component, OnInit} from '@angular/core';
import {CategoriasEntity} from "../categorias.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-categoria-main',
  templateUrl: './categoria-main.component.html',
  styleUrls: ['./categoria-main.component.scss']
})
export class CategoriaMainComponent implements OnInit {

  form = new FormGroup({
    nome: new FormControl('')
  })

  table: CdkDynamicTable.tableClass;

  constructor(
    public cdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = cdkTable.createByCrudEnity2(new CategoriasEntity(), {
      actions: {
        edit: {
          name: "Editar",
          dbClick: true,
          action: (val: CategoriasEntity) => router.navigate(['user', 'categorias', val?.id]).then()
        }
      },
      filters: {
        group: 'categorias', filters: {
          nome: { findFunc: val => { return { nome_like: val } } }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
