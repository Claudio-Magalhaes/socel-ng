import { Injectable } from '@angular/core';
import {AbstractHttpService} from "@datagrupo/dg-crud";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenericService extends AbstractHttpService<any> {

  constructor(Http: HttpClient) {
    super(Http, environment.apiUrl, '')
  }
}
