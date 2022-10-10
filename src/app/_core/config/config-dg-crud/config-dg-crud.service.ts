import { Injectable } from '@angular/core';
import {AbstractConfigDgCrudService} from "@datagrupo/dg-crud";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ConfigDgCrudService extends AbstractConfigDgCrudService{

  constructor(
    public override http: HttpClient,
    public override location: Location
  ) {
    super(http, location)
  }
}
