import {AbstractEntity2, DataServer} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {PRODUTOS} from "../../../_core/endpoints";
import {CategoriasEntity} from "../categorias/categorias.entity";
import {DynamicTableEntity, DynamicColumn} from "@datagrupo/dg-ng-util";
import {genereteDefaultActionTable} from "../../../_core/config/dg-ng-util/config-local-dynamic-table";

@DataServer({
  path: environment.apiUrl,
  context: PRODUTOS
})
@DynamicTableEntity({
  api: {
    path: environment.apiUrl,
    context: PRODUTOS
  },
  filters: {
    group: 'produtos',
    reactive: true,
    filters: {
      // nome: { findFunc: val => { return { nome: val} }, reactive: true },
      // status: { findFunc: val => { return { status: val} }, reactive: true }
    }
  },
  sort: true,
  actions: {
    editar: {
      name: 'Editar', dbClick: true, action: val => {
        genereteDefaultActionTable.link(['user', 'produtos', val.id])
      }
    }
  },
})
export class ProdutosEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    nome?: string,
    categoria?: CategoriasEntity,
    preco?: string,
    estoqueAtual?: string,
    alertaEstoqueMinimo?: string,
    disponivelSite?: boolean,
    status?: boolean,
    descricao?: string,
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.preco = preco;
    this.estoqueAtual = estoqueAtual;
    this.alertaEstoqueMinimo = alertaEstoqueMinimo;
    this.disponivelSite = !!disponivelSite;
    this.descricao = descricao;
    this.status = !!status;
  }

  @DynamicColumn({ headerName: 'ID' })
  override id: number | string | undefined;

  @DynamicColumn({ headerName: 'nome' })
  nome: string | undefined

  @DynamicColumn({ headerName: 'Preço atual' })
  preco: string | undefined

  @DynamicColumn({ headerName: 'Estoque' })
  estoqueAtual: string | undefined

  @DynamicColumn({ headerName: 'Estoque mínimo' })
  alertaEstoqueMinimo: string | undefined

  @DynamicColumn({ headerName: 'Status', resource: val => !!val ? 'ATIVO' : 'INATIVO' })
  status: boolean = false

  categoria: CategoriasEntity | undefined
  disponivelSite: boolean = false
  descricao: string | undefined
}
