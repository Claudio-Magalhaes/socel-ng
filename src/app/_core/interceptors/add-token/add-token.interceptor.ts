import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../../../services/token-service/token.service";
import {AbstractAddToken} from "@datagrupo/dg-ng";

@Injectable()
export class AddTokenInterceptor extends AbstractAddToken implements HttpInterceptor {

  override listRouterExcepAddToken = ['/']

  constructor(public token: TokenService) {
    super(token);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get('Authorization')) {
      return next.handle(request);
    }

    return this.rootIntercept(request, next)
  }

  pipeRequestRefreshToken(resp: any): string {
    return "";
  }
}
