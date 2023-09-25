import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {ContatoEntity} from "../clientes/_entitys/contato.entity";
import {EnderecoEntity} from "../clientes/_entitys/endereco.entity";
import {environment} from "../../../../environments/environment";
import {LOCACAO} from "../../../_core/endpoints";

@DataServer({
  path: environment.apiUrl_mock,
  context: LOCACAO
})
export class LocacaoEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    cliente?: ClientesEntity,
    contato?: ContatoEntity,
    endereco?: EnderecoEntity,
    status?: string,
    dataInicial?: string,
    dataFinal?: string,
    descricao?: string,
    obsercacoes?: string,
  ) {
    super();
    this.id = id;
    this.cliente = cliente;
    this.contato = contato;
    this.endereco = endereco;
    this.status = status;
    this.dataInicial = dataInicial;
    this.dataFinal = dataFinal;
    this.descricao = descricao;
    this.obsercacoes = obsercacoes;
  }

  @DynamicColumn({ headerName: 'Cliente', resource: (val: ClientesEntity) => val.nome || '--' })
  public cliente: ClientesEntity | undefined
  public contato: ContatoEntity | undefined
  public endereco: EnderecoEntity | undefined
  public status: string | undefined
  public dataInicial: string | undefined
  public dataFinal: string | undefined
  public descricao: string | undefined
  public obsercacoes: string | undefined

}
