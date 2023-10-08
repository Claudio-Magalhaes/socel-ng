import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {EnderecoEntity} from "./_entitys/endereco.entity";
import {ContatoEntity} from "./_entitys/contato.entity";
import {environment} from "../../../../environments/environment";
import {CLIENTE} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl,
  context: CLIENTE
})
export class ClientesEntity extends AbstractEntity2 {

  constructor(
    id?: string | number,
    nome?: string,
    sexo?: string,
    tipoPessoa?: string,
    documento?: string,
    endereco?: EnderecoEntity,
    contato?: ContatoEntity
  ) {
    super()
    this.id = id;
    this.nome = nome;
    this.sexo = sexo;
    this.tipoPessoa = tipoPessoa;
    this.documento = documento;
    this.endereco = endereco;
    this.contato = contato;
  }


  @DynamicColumn({ headerName: 'id' })
  override id: string | number | undefined;

  @DynamicColumn({ headerName: 'nome:'})
  public nome: string | undefined;

  public sexo: string | undefined;
  public tipoPessoa: string | undefined;
  public email: string | undefined;
  public documento: string | undefined;

  public endereco: EnderecoEntity | undefined;
  public contato: ContatoEntity | undefined;

}
