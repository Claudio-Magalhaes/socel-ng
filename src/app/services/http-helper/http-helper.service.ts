import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(public http: HttpClient) {}

  public getCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}
