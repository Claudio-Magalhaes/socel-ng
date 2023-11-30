import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriasEntity} from "../categorias.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalCategoriaInsertEditComponent} from "../modal-categoria-insert-edit/modal-categoria-insert-edit.component";
import {CategoriasTable} from "../categorias.table";

@Component({
  selector: 'app-categoria-main',
  templateUrl: './categoria-main.component.html',
  styleUrls: ['./categoria-main.component.scss']
})
export class CategoriaMainComponent implements OnInit {

  @ViewChild('modal') modal!: ModalCategoriaInsertEditComponent;

  form = new FormGroup({
    nome: new FormControl('')
  })

  table: CdkDynamicTable.tableClass;

  constructor(
    public cdkTable: CdkDynamicTableService,
    private router: Router
  ) {
    this.table = cdkTable.createByEntity(new CategoriasEntity())
  }

  ngOnInit(): void {
  }

}
