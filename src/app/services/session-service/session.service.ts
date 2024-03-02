import { Injectable } from '@angular/core';
import {AbstractSessionService} from "@datagrupo/dg-ng";
import {TokenService} from "../token-service/token.service";

export declare type tipoPerfil = 'GERENTE' | 'FUNCIONARIO'

interface UserApp {
  sub: number | string,
  name: string,
  email: string,
  permissoes: any
}

@Injectable({
  providedIn: 'root'
})
export class SessionService extends AbstractSessionService {

  constructor(public token: TokenService) {
    super(token)
  }

  user: UserApp | {[key: string]: any} = {};

  setUser(): void {
    let token = this.token.abrirToken();
    this.user.sub = token.sub;
    this.user.name = token.name;
    this.user.email = token.email;
    this.user.permissoes = token.permissoes;
  }

  override checkPerfil(perfil: tipoPerfil | tipoPerfil[]): boolean {
    return super.checkPerfil(perfil, 'perfil');
  }
}
