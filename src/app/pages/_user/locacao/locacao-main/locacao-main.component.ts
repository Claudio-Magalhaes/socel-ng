import { Component, OnInit } from '@angular/core';
import {LocacaoEntity} from "../locacao.entity";

@Component({
  selector: 'app-locacao-main',
  templateUrl: './locacao-main.component.html',
  styleUrls: ['./locacao-main.component.scss']
})
export class LocacaoMainComponent implements OnInit {

  public entity = new LocacaoEntity()

  constructor() { }

  ngOnInit(): void {
  }

}
