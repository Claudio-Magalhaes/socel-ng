import {AbstractEntity, DataServer, DgTableColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {PRODUTOS} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: PRODUTOS
})
export class ProdutosEntity extends AbstractEntity {

  constructor(
    id?: number | string,
    nome?: string,
    categoria?: string,
    preco?: string,
    estoqueAtual?: string,
    alertaEstoqueMinimo?: string,
    disponivelSite?: boolean,
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
  }

  @DgTableColumn({ columnName: 'nome' })
  nome: string | undefined
  categoria: string | undefined
  preco: string | undefined
  estoqueAtual: string | undefined
  alertaEstoqueMinimo: string | undefined
  disponivelSite: boolean = false
  descricao: string | undefined
}