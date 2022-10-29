import { Injectable } from '@angular/core';
import {AbstractHttpService, HttpUpdateServiceInterface} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../../clientes.entity";
import {ConfigDgCrudService} from "../../../../../_core/config/config-dg-crud/config-dg-crud.service";
import {environment} from "../../../../../../environments/environment";
import {AbstractCrudMockService} from "../../../../../services/abstract-crud-mock-service/abstract-crud-mock.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends AbstractCrudMockService<ClientesEntity> {

  constructor(
    public config: ConfigDgCrudService,
  ) {
    super(config, environment.apiUrl, 'clientes');
  }

  override saveOrUpdate(data: any, endpointData?: HttpUpdateServiceInterface): Observable<any> {
    return super.saveOrUpdate(data, endpointData);
  }
}
