import { Component, OnInit } from '@angular/core';
import {ClientesEntity} from "../clientes.entity";

@Component({
  selector: 'app-clientes-main',
  templateUrl: './clientes-main.component.html',
  styleUrls: ['./clientes-main.component.scss']
})
export class ClientesMainComponent implements OnInit {

  public entity = new ClientesEntity();

  // constructor(public service: ClientesService) { }
  constructor() { }

  ngOnInit(): void {
  }

  teste() {
    // this.service.get('', {path: environment.apiUrl, context: 'clientes'}).subscribe(
    //   resp => {
    //     console.log(resp)
    //   }
    // )
  }

  teste2() {
    // this.service.get('clientes/1', {path: environment.apiUrl}).subscribe(
    //   resp => {
    //     console.log(resp)
    //   }
    // )
  }

}
