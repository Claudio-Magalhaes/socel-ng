import { Component, OnInit } from '@angular/core';
import {PermissaoEntity} from "../permissao.entity";

@Component({
  selector: 'app-permissoes-main',
  templateUrl: './permissoes-main.component.html',
  styleUrls: ['./permissoes-main.component.scss']
})
export class PermissoesMainComponent implements OnInit {

  public entity = new PermissaoEntity()

  constructor() { }

  ngOnInit(): void {
  }

}
