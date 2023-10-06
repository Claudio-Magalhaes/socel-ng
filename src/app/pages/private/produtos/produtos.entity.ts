import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {PRODUTOS} from "../../../_core/endpoints";
import {CategoriasEntity} from "../categorias/categorias.entity";

@DataServer({
  path: environment.apiUrl_mock,
  context: PRODUTOS
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

  @DynamicColumn({ headerName: 'nome' })
  nome: string | undefined
  categoria: CategoriasEntity | undefined
  @DynamicColumn({ headerName: 'Preço atual' })
  preco: string | undefined
  @DynamicColumn({ headerName: 'Estoque' })
  estoqueAtual: string | undefined
  @DynamicColumn({ headerName: 'Estoque mínimo' })
  alertaEstoqueMinimo: string | undefined
  @DynamicColumn({ headerName: 'Status' })
  status: boolean = false
  disponivelSite: boolean = false
  descricao: string | undefined
}