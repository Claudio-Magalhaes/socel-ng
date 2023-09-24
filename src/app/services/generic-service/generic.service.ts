import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AbstractGenericService} from "dg-ng-util";

@Injectable({
  providedIn: 'root'
})
export class GenericService extends AbstractGenericService {

  constructor(protected Http: HttpClient) {
    super(Http, environment.apiUrl_mock)
  }
}
