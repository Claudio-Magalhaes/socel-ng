import {CdkDynamicTable} from "@datagrupo/dg-ng-util";
import {LocacaoEntity} from "./locacao.entity";
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

export const filters = {
  id: '',
  nomeCliente: '',
  status: '',
  dataInicial_inicio: '',
  dataInicial_fim: '',
  dataFinal_inicio: '',
  dataFinal_fim: '',
  renovada: '',
  faturada: '',
}

export const LocacaoTable: CdkDynamicTable.createDynamicTable = {
  filters: {
    group: 'locacoes',
    reactive: false,
    filters: {
      id: {
        reactive: true, findFunc: val => {
          return {id: val}
        }
      },
      nomeCliente: {
        reactive: true, findFunc: val => {
          return {nomeCliente: val}
        }
      },
      status: {
        reactive: true, findFunc: val => {
          return {status: val}
        }
      },
      dataInicial_inicio: {
        findFunc: val => {
          return {dataInicial_inicio: val}
        }
      },
      dataInicial_fim: {
        findFunc: val => {
          return {dataInicial_fim: val}
        }
      },
      dataFinal_inicio: {
        findFunc: val => {
          return {dataFinal_inicio: val}
        }
      },
      dataFinal_fim: {
        findFunc: val => {
          return {dataFinal_fim: val}
        }
      },

      dataInicial: {
        reactive: true, findFunc: val => {
          return {dataInicial: val}
        }
      },
      dataFinal: {
        reactive: true, findFunc: val => {
          return {dataFinal: val}
        }
      },
    }
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
}
