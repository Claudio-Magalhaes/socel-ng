import { Injectable } from '@angular/core';
import {AbstractHttpService} from "@datagrupo/dg-crud";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {EnderecoEntity} from "../../_entitys/endereco.entity";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService extends AbstractHttpService<EnderecoEntity>{

  constructor(public Http: HttpClient) {
    super(Http, environment.apiUrl, 'clientes_enderecos')
  }
}
