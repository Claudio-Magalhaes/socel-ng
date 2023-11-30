import {AbstractEntity2, DataServer} from "@datagrupo/dg-crud";
import {ClientesEntity} from "../clientes/clientes.entity";
import {ContatoEntity} from "../clientes/_entitys/contato.entity";
import {EnderecoEntity} from "../clientes/_entitys/endereco.entity";
import {environment} from "../../../../environments/environment";
import {LOCACAO} from "../../../_core/endpoints";
import {funcIconsFaturado, LancamentoEntity} from "../lancamentos/lancamento.entity";
import {DynamicTableEntity, DynamicColumn} from "@datagrupo/dg-ng-util";
import {genereteDefaultActionTable} from "../../../_core/config/dg-ng-util/config-local-dynamic-table";
import {receiveEventLocacaoActions} from "./service/locacao.service";

/**
 * Função para retornar cor de linha conforme a data de vencimento da locação
 * @param val
 * @param row
 */
export const classesStatus = (val: string, row: LocacaoEntity): string => {
  if (!row.dataFinal) return '';
  if (
    ['FINALIZADO', 'FINALIZADA', 'ABERTO', 'CANCELADO', 'RENOVADO']
      .includes((row?.status || '').toUpperCase())) return '';
  let dataFinal = new Date(row.dataFinal)
  let dataAtual = new Date();

  if (
    dataAtual.toLocaleDateString('pt-BR', {timeZone: 'UTC'}) ==
    dataFinal.toLocaleDateString('pt-BR', {timeZone: 'UTC'})) {
    return 'locacao-vencendo-hoje'
  }

  let dataComAcressimo = new Date();
  dataComAcressimo.setDate(dataAtual.getDate() + 5);

  if (dataComAcressimo >= dataFinal) {
    return 'locacao-atrazada'
  }

  if (new Date() > dataFinal) {
    return 'locacao-atrazada'
  }

  return '';
}


@DataServer({
  path: environment.apiUrl,
  context: LOCACAO
})
@DynamicTableEntity({
  api: {
    path: environment.apiUrl,
    context: LOCACAO
  },
  filters: {
    group: 'locacoes',
    reactive: false
  },
  actions: {
    edit: {
      name: 'Abrir',
      dbClick: true,
      action: (val: LocacaoEntity) => {
        if(!val?.id) return
        genereteDefaultActionTable.link(['user', 'locacoes', val?.id])
      }
    },
    iniciar: {
      name: 'Iniciar locação',
      action: (row) => {
        window.dispatchEvent(new CustomEvent('locacao-action-receive', {
          detail: <receiveEventLocacaoActions>{ typeEvent: 'iniciar', row }
        }))
      },
      permission: (row) => {
        return row.status.toUpperCase() == 'ABERTO'
      }
    },
    finalizar: {
      name: 'Finalizar locação',
      action: (row) => {
        window.dispatchEvent(new CustomEvent('locacao-action-receive', {
          detail: <receiveEventLocacaoActions>{ typeEvent: 'finalizar', row }
        }))
      },
      permission: (row) => {
        return row.status == 'EM_LOCACAO'
      }
    },
    cancelar: {
      name: 'Cancelar',
      action: (row) => {
        window.dispatchEvent(new CustomEvent('locacao-action-receive', {
          detail: <receiveEventLocacaoActions>{ typeEvent: 'cancelar', row }
        }))
      },
      permission: (row) => {
        return row.status == 'ABERTO'
      }
    },
    faturar: {
      name: 'Faturar',
      action: (row) => {
        window.dispatchEvent(new CustomEvent('locacao-action-receive', {
          detail: <receiveEventLocacaoActions>{ typeEvent: 'faturar', row }
        }))
      },
      permission: (row: LocacaoEntity) => {
        return !row.lancamento && ( row.status != 'ABERTO' )
      }
    },
    verLancamento: {
      name: 'Ver faturamento',
      action: (row) => {
        window.dispatchEvent(new CustomEvent('locacao-action-receive', {
          detail: <receiveEventLocacaoActions>{ typeEvent: 'verLancamento', row }
        }))
      },
      permission: (row: LocacaoEntity) => {
        return !!row.lancamento
      }
    },
    renovar: {
      name: "Renovar",
      action: (row) => {
        window.dispatchEvent(new CustomEvent('locacao-action-receive', {
          detail: <receiveEventLocacaoActions>{ typeEvent: 'renovar', row }
        }))
      },
      permission: (row: LocacaoEntity) => {
        if (row.status?.toUpperCase() == 'FINALIZADA') {
          const dataComAcressimo = new Date(row.dataFinal || '');
          let dateCurrent = new Date();
          dataComAcressimo.setDate(dataComAcressimo.getDate() + 5);

          if (dateCurrent <= dataComAcressimo) return true;
        }
        if (row.status?.toUpperCase() == 'EM_LOCACAO') {
          const dataFinal = new Date(row.dataFinal || '');
          let dateCurrent = new Date();

          if (dateCurrent >= dataFinal) return true;
        }

        return false;
      }
    },
    verRenocacao: {
      name: 'Ver renovação',
      action: (val: LocacaoEntity) => {
        if(!val?.renovacao?.id) return
        genereteDefaultActionTable.link(['user', 'locacoes', val?.renovacao.id])
      },
      permission: (row: LocacaoEntity) => {
        return row.status?.toUpperCase() == 'RENOVADO';
      }
    },
  },
  sort: true,
  pagination: {
    sort: 'dataInicial,ASC'
  }
})
export class LocacaoEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    cliente?: ClientesEntity,
    contato?: ContatoEntity,
    endereco?: EnderecoEntity,
    lancamento?: LancamentoEntity,
    renovacao?: LocacaoEntity,
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
    this.lancamento = lancamento;
    this.renovacao = renovacao;
  }

  @DynamicColumn({headerName: 'ID', tdClass: classesStatus})
  override id: number | string | undefined;
  @DynamicColumn({headerName: 'Cliente', tdClass: classesStatus, resource: (val: ClientesEntity) => String(val.nome || '--')})
  public cliente: ClientesEntity | undefined
  @DynamicColumn({headerName: 'Data Início', tdClass: classesStatus, resource: val => !!val ? val.split('-').reverse().join('/') : '--'})
  public dataInicial: string | undefined
  @DynamicColumn({headerName: 'Data Fim', tdClass: classesStatus, resource: val => !!val ? val.split('-').reverse().join('/') : '--'})
  public dataFinal: string | undefined
  @DynamicColumn({
    headerName: 'Status', tdClass: classesStatus, resource: (val) => {
      switch (val) {
        case 'FINALIZADA':
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

  @DynamicColumn({headerName: 'Valor', tdClass: classesStatus})
  public total: string | undefined

  @DynamicColumn({
    headerName: 'Faturamento', tdClass: classesStatus, resource: (val: LancamentoEntity | undefined) => {
      if (!!val) {
        return funcIconsFaturado(!!val, val)
      }
      return '<span class="material-symbols-outlined" data-toggle="tooltip" data-placement="top" title="Aguardando Faturamento">' +
        'note_add</span>'
    }
  })
  public lancamento: LancamentoEntity | undefined

  public renovacao: LocacaoEntity | undefined
  public contato: ContatoEntity | undefined
  public endereco: EnderecoEntity | undefined
  public descricao: string | undefined
  public obsercacoes: string | undefined
  public totalServicos: string | number | undefined
  public totalProdutos: string | number | undefined

}
