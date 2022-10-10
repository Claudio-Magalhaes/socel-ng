import { Injectable } from '@angular/core';
import {AbstractHttpService} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../../clientes.entity";
import {ConfigDgCrudService} from "../../../../../_core/config/config-dg-crud/config-dg-crud.service";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends AbstractHttpService<ClientesEntity> {

  constructor(
    public config: ConfigDgCrudService,
  ) {
    super(config, environment.apiUrl, 'clientes');
  }
}
