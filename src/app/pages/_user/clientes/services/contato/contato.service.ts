import { Injectable } from '@angular/core';
import {AbstractHttpService} from "@datagrupo/dg-crud";
import {ContatoEntity} from "../../_entitys/contato.entity";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContatoService extends AbstractHttpService<ContatoEntity>{

  constructor(public Http: HttpClient) {
    super(Http, environment.apiUrl, 'clientes_contatos')
  }
}
