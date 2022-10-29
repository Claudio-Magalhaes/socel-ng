import { Component, OnInit } from '@angular/core';
import {ServicoEntity} from "../servico.entity";

@Component({
  selector: 'app-servicos-main',
  templateUrl: './servicos-main.component.html',
  styleUrls: ['./servicos-main.component.scss']
})
export class ServicosMainComponent implements OnInit {

  public entity = new ServicoEntity()

  constructor() { }

  ngOnInit(): void {
  }

}
