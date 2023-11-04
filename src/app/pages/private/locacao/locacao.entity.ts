import {AbstractEntity2, DataServer, DynamicColumn} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {ContatoEntity} from "../clientes/_entitys/contato.entity";
import {EnderecoEntity} from "../clientes/_entitys/endereco.entity";
import {environment} from "../../../../environments/environment";
import {LOCACAO} from "../../../_core/endpoints";
import {LancamentoEntity} from "../lancamentos/lancamento.entity";

@DataServer({
  path: environment.apiUrl,
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

  @DynamicColumn({headerName: 'ID'})
  override id: number | string | undefined;
  @DynamicColumn({headerName: 'Cliente', resource: (val: ClientesEntity) => String(val.nome || '--')})
  public cliente: ClientesEntity | undefined
  @DynamicColumn({headerName: 'Data Início', resource: val => !!val ? val.split('-').reverse().join('/') : '--'})
  public dataInicial: string | undefined
  @DynamicColumn({headerName: 'Data Fim', resource: val => !!val ? val.split('-').reverse().join('/') : '--'})
  public dataFinal: string | undefined
  @DynamicColumn({
    headerName: 'Status', resource: (val) => {
      switch (val) {
        case 'FINALIZADO':
          return '<span class="badge status text-bg-success">Finalizada</span>'
        case 'EM_LOCACAO':
          return '<span class="badge status text-bg-warning">Em locação</span>'
        case 'ABERTO':
          return '<span class="badge status text-bg-secondary">Aberta</span>'
        default:
          return val;
      }

    }
  })
  public status: string | undefined
  @DynamicColumn({headerName: 'Valor'})
  public total: string | undefined
  @DynamicColumn({headerName: 'Faturamento', resource: val => 'CRIAR'})
  public faturamento: LancamentoEntity | undefined

  public contato: ContatoEntity | undefined
  public endereco: EnderecoEntity | undefined
  public descricao: string | undefined
  public obsercacoes: string | undefined
  public totalServicos: string | number | undefined
  public totalProdutos: string | number | undefined

}
