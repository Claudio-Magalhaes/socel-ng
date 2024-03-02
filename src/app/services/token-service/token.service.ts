import { Injectable } from '@angular/core';
import {AbstractTokenService} from "@datagrupo/dg-ng";
import {tipoPerfil} from "../session-service/session.service";
import {HttpClient} from "@angular/common/http";

interface token {
  sub: number | string,
  name: string,
  email: string,
  permissoes: any
}

@Injectable({
  providedIn: 'root'
})
export class TokenService extends AbstractTokenService<token>{

  constructor(private http: HttpClient) {
    super(http)
  }

  path_refreshToken: string = '';
}
