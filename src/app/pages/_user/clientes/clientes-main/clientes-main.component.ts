import { Component, OnInit } from '@angular/core';
import {ClientesEntity} from "../clientes.entity";
import {ClientesService} from "../services/clientes/clientes.service";
import {environment} from "../../../../../environments/environment";

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

  teste() {
    this.service.get('', {path: environment.apiUrl, context: 'clientes'}).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }

  teste2() {
    this.service.get('clientes/1', {path: environment.apiUrl}).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }

}
