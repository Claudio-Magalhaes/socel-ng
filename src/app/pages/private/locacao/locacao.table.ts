import {CdkDynamicTable} from "@datagrupo/dg-ng-util";
import {LocacaoEntity} from "./locacao.entity";

/**
 * Função para retornar cor de linha conforme a data de vencimento da locação
 * @param val
 * @param row
 */
export const classesStatus = (val: string, row: LocacaoEntity): string => {
  if (!row.dataFinal) return '';
  if (['FINALIZADO', 'FINALIZADA', 'ABERTO', 'CANCELADO'].includes(row?.status || '')) return '';

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

  return '';
}

export const LocacaoTable: CdkDynamicTable.createDynamicTable = {
  filters: {
    group: 'locacoes',
    reactive: true,
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
      name: 'Editar',
      dbClick: true,
      action: (val: LocacaoEntity) => {
        // this.router.navigate(['user', 'locacoes', val?.id]).then()
      },
      permission: row => {
        return row.status == 'ABERTO';
      }
    },
    ver: {
      name: 'Ver',
      dbClick: true,
      action: (val: LocacaoEntity) => {
        // this.router.navigate(['user', 'locacoes', val?.id]).then()
      },
      permission: row => {
        return row.status != 'ABERTO';
      }
    },
    iniciar: {
      name: 'Iniciar locação',
      action: (row) => {
        // this.service.iniciar(row.id, () => this.table.find())
      },
      permission: (row) => {
        return row.status == 'ABERTO'
      }
    },
    finalizar: {
      name: 'Finalizar locação',
      action: (row) => {
        // this.service.finalizar(row.id, () => this.table.find())
      },
      permission: (row) => {
        return row.status == 'EM_LOCACAO'
      }
    },
    cancelar: {
      name: 'Cancelar',
      action: (row) => {

      },
      permission: (row) => {
        return row.status == 'ABERTO'
      }
    },
    faturar: {
      name: 'Faturar',
      action: (row) => {

      },
      permission: (row: LocacaoEntity) => {
        return !row.lancamento
      }
    }
  },
  sort: true
}
