import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {CATEGORIAS} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: CATEGORIAS
})
export class CategoriasEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    nome?: string,
    status?: boolean,
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.status = !!status
  }


  @DynamicColumn({ headerName: 'ID' })
  override id: number | string | undefined;
  @DynamicColumn({ headerName: 'nome' })
  nome: string | undefined;
  @DynamicColumn({ headerName: 'status', resource: (val:boolean) => !!val ? "ATIVO" : "INATIVO" })
  status: boolean = false;
}
