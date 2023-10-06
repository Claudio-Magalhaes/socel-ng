import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {EnderecoEntity} from "./_entitys/endereco.entity";
import {ContatoEntity} from "./_entitys/contato.entity";
import {environment} from "../../../../environments/environment";
import {CLIENTE} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl_mock,
  context: CLIENTE
})
export class ClientesEntity extends AbstractEntity2 {

  constructor(
    id?: string | number,
    nome?: string,
    sexo?: string,
    pessoa_fisica?: string,
    documento?: string,
    enderecos?: EnderecoEntity[],
    contatos?: ContatoEntity[]
  ) {
    super()
    this.id = id;
    this.nome = nome;
    this.sexo = nome;
    this.pessoa_fisica = nome;
    this.email = nome;
    this.documento = nome;
    this.enderecos = Array.isArray(enderecos) ? enderecos : [];
    this.contatos = Array.isArray(contatos) ? contatos : [];
  }


  @DynamicColumn({ headerName: 'id' })
  override id: string | number | undefined;

  @DynamicColumn({ headerName: 'nome:'})
  public nome: string | undefined;

  public sexo: string | undefined;
  public pessoa_fisica: string | undefined;
  public email: string | undefined;
  public documento: string | undefined;

  public enderecos: EnderecoEntity[] = []
  public contatos: ContatoEntity[] = []

}
