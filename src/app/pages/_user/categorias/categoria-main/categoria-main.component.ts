import {Component, OnInit} from '@angular/core';
import {CategoriasEntity} from "../categorias.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categoria-main',
  templateUrl: './categoria-main.component.html',
  styleUrls: ['./categoria-main.component.scss']
})
export class CategoriaMainComponent implements OnInit {

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
      }
    })
  }

  ngOnInit(): void {
  }

}
