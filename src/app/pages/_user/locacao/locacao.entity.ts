import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {ContatoEntity} from "../clientes/_entitys/contato.entity";
import {EnderecoEntity} from "../clientes/_entitys/endereco.entity";
import {environment} from "../../../../environments/environment";
import {LOCACAO} from "../../../_core/endpoints";
import {LancamentoEntity} from "../lancamentos/lancamento.entity";

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

  @DynamicColumn({ headerName: 'Cliente', resource: (val: ClientesEntity) => String(val.id || '--') })
  public cliente: ClientesEntity | undefined
  @DynamicColumn({ headerName: 'Data Início' })
  public dataInicial: string | undefined
  @DynamicColumn({ headerName: 'Data Fim' })
  public dataFinal: string | undefined
  @DynamicColumn({ headerName: 'Status' })
  public status: string | undefined
  @DynamicColumn({ headerName: 'Valor' })
  public valor: string | undefined
  @DynamicColumn({ headerName: 'Faturamento', resource: val => 'CRIAR' })
  public faturamento: LancamentoEntity | undefined

  public contato: ContatoEntity | undefined
  public endereco: EnderecoEntity | undefined
  public descricao: string | undefined
  public obsercacoes: string | undefined

}
