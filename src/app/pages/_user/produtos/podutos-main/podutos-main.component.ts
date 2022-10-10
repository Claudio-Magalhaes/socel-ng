import { Component, OnInit } from '@angular/core';
import {ProdutosEntity} from "../produtos.entity";

@Component({
  selector: 'app-podutos-main',
  templateUrl: './podutos-main.component.html',
  styleUrls: ['./podutos-main.component.scss']
})
export class PodutosMainComponent implements OnInit {

  public entity = new ProdutosEntity();

  constructor() { }

  ngOnInit(): void {
  }

}
