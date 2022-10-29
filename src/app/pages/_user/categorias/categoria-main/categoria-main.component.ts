import { Component, OnInit } from '@angular/core';
import {CategoriasEntity} from "../categorias.entity";

@Component({
  selector: 'app-categoria-main',
  templateUrl: './categoria-main.component.html',
  styleUrls: ['./categoria-main.component.scss']
})
export class CategoriaMainComponent implements OnInit {

  public entity = new CategoriasEntity();

  constructor() { }

  ngOnInit(): void {
  }

}
