import {AbstractHttpService} from "@datagrupo/dg-crud";
import {ConfigDgCrudService} from "../../_core/config/config-dg-crud/config-dg-crud.service";
import {environment} from "../../../environments/environment";
import {AbstractRootEntity} from "@datagrupo/dg-crud/lib/abstract/entitys/abstract-root.entity";

export abstract class AbstractCrudMockService<ENTITY extends AbstractRootEntity>  extends AbstractHttpService<any>{

  protected constructor(
    public _config: ConfigDgCrudService,
    public __path = '',
    public _context = ''
  ) {
    super(_config, __path, _context);
  }
}
