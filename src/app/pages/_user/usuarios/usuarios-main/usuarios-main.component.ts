import { Component, OnInit } from '@angular/core';
import {UsuariosEntity} from "../usuarios.entity";

@Component({
  selector: 'app-usuarios-main',
  templateUrl: './usuarios-main.component.html',
  styleUrls: ['./usuarios-main.component.scss']
})
export class UsuariosMainComponent implements OnInit {

  public entity = new UsuariosEntity();

  constructor() { }

  ngOnInit(): void {
  }

}
