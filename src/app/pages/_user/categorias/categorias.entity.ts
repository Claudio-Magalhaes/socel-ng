import {AbstractEntity, DataServer, DgTableColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {CATEGORIAS} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: CATEGORIAS
})
export class CategoriasEntity extends AbstractEntity {

  constructor(
    id?: number | string,
    nome?: string,
    disponivelSite?: boolean,
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.disponivelSite = !!disponivelSite
  }


  @DgTableColumn({ columnName: 'nome' })
  nome: string | undefined
  disponivelSite: boolean = false
}
