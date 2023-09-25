import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {environment} from "../../../../../environments/environment";
import {CLIENTE_ENDERECOS} from "../../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl_mock,
  context: CLIENTE_ENDERECOS
})
export class EnderecoEntity extends AbstractEntity2 {

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

  @DynamicColumn({ headerName: 'Bairro' })
  bairro: string | undefined;
  @DynamicColumn({ headerName: 'Rua' })
  rua: string | undefined;
  @DynamicColumn({ headerName: 'Numero' })
  numero: string | undefined;
  @DynamicColumn({ headerName: 'Complemento' })
  complemento: string | undefined;
  cep: string | undefined;
  uf: string | undefined;
  cidade: string | undefined;
  descricao: string | undefined;
}
