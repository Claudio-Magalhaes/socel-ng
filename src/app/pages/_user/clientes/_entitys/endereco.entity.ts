import {AbstractEntity} from "@datagrupo/dg-crud";


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

  cep: string | undefined;
  uf: string | undefined;
  cidade: string | undefined;
  bairro: string | undefined;
  rua: string | undefined;
  numero: string | undefined;
  complemento: string | undefined;
  descricao: string | undefined;
}
