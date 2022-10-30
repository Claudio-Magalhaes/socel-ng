import {AbstractEntity, DataServer, DgTableColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../../environments/environment";
import {CLIENTE_ENDERECOS} from "../../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: CLIENTE_ENDERECOS
})
export class EnderecoEntity extends AbstractEntity {

  constructor(
    id?: number | string,
    cep?: string,
    uf?: string,
    cidade?: string,
    bairro?: string,
    rua?: string,
    numero?: string,
    complemento?: string,
    descricao?: string
  ) {
    super();
    this.id = id;
    this.cep = cep;
    this.uf = uf;
    this.cidade = cidade;
    this.bairro = bairro;
    this.rua = rua;
    this.numero = numero;
    this.complemento = complemento;
    this.descricao = descricao;
  }

  @DgTableColumn({ columnName: 'Rua' })
  rua: string | undefined;
  numero: string | undefined;
  cep: string | undefined;
  uf: string | undefined;
  cidade: string | undefined;
  bairro: string | undefined;
  complemento: string | undefined;
  descricao: string | undefined;
}