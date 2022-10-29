import { Component, OnInit } from '@angular/core';
import {LancamentoEntity} from "../lancamento.entity";

@Component({
  selector: 'app-lancamentos-main',
  templateUrl: './lancamentos-main.component.html',
  styleUrls: ['./lancamentos-main.component.scss']
})
export class LancamentosMainComponent implements OnInit {

  public entity = new LancamentoEntity()

  constructor() { }

  ngOnInit(): void {
  }

}
