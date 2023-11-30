import {AbstractEntity2, DataServer} from "@datagrupo/dg-crud";
import {EnderecoEntity} from "./_entitys/endereco.entity";
import {ContatoEntity} from "./_entitys/contato.entity";
import {environment} from "../../../../environments/environment";
import {CLIENTE} from "../../../_core/endpoints";
import {CdkDgTable, DynamicTableEntity, DynamicColumn} from "@datagrupo/dg-ng-util";
import {genereteDefaultActionTable} from "../../../_core/config/dg-ng-util/config-local-dynamic-table";

@DataServer({
  path: environment.apiUrl,
  context: CLIENTE
})
@DynamicTableEntity({
  api: {
    path: environment.apiUrl,
    context: CLIENTE
  },
  filters: {
    group: 'clientes',
    reactive: true
  },
  sort: true,
  actions: {
    editar: {
      name: 'Editar', dbClick: true, action: val => {
        genereteDefaultActionTable.link(['user', 'clientes', val.id])
      }
    }
  },
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


  @DynamicColumn({headerName: 'id'})
  override id: string | number | undefined;

  @DynamicColumn({headerName: 'nome'})
  public nome: string | undefined;

  @DynamicColumn({
    headerName: 'Documento', resource: (val: string | undefined) => {
      if (!!val) {
        if(val.length == 11) return CdkDgTable.mask('cpf', val)
        if(val.length == 14) return CdkDgTable.mask('cnpj', val)
      }
      return val || '--';
    }
  })
  public documento: string | undefined;

  @DynamicColumn({headerName: 'Status'})
  public status: string | undefined

  public sexo: string | undefined;
  public tipoPessoa: string | undefined;
  public email: string | undefined;

  public endereco: EnderecoEntity | undefined;
  public contato: ContatoEntity | undefined;

}
