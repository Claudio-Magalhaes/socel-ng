import { Component, OnInit } from '@angular/core';
import {ClientesEntity} from "../clientes.entity";
import {ClientesService} from "../services/clientes/clientes.service";

@Component({
  selector: 'app-clientes-main',
  templateUrl: './clientes-main.component.html',
  styleUrls: ['./clientes-main.component.scss']
})
export class ClientesMainComponent implements OnInit {

  public entity = new ClientesEntity();

  constructor(public service: ClientesService) { }

  ngOnInit(): void {
  }

}
