import {CdkDynamicTable} from "@datagrupo/dg-ng-util";
import {LancamentoEntity} from "./lancamento.entity";

const defaultFindFunc = (val: string, nome: string) => {
  if (!!val) {
    return {[nome]: val}
  }
  return {}
}

export const funcIconsFaturado = (val: boolean, row: LancamentoEntity) => {
  if (!!val) {
    return '<span class="material-symbols-outlined fatura-pago" data-toggle="tooltip" data-placement="top" title="Pago">select_check_box</span>';
  }
  if (row.data_vencimento && !val) {
    const date = new Date(row.data_vencimento)
    const loucurasDoJs = new Date().toLocaleDateString('pt-br')
    const currentDate = new Date(loucurasDoJs.split('/').reverse().join('-'));

    if (date < currentDate) {
      return '<span class="material-symbols-outlined fatura-atrazado" data-toggle="tooltip" data-placement="top" title="Atrazado">hourglass_bottom</span>';
    }
  }

  return '<span class="material-symbols-outlined" data-toggle="tooltip" data-placement="top" title="Aguardando Pagamento">hourglass_top</span>'
}

export const LancamentoTable: CdkDynamicTable.createDynamicTable = {
  filters: {
    group: 'lancamentos', reactive: true, filters: {
      id: { findFunc: val => defaultFindFunc(val, 'id')},
      nome: { findFunc: val => defaultFindFunc(val, 'nome')},
      tipo: { findFunc: val => defaultFindFunc(val, 'tipo')},
    }
  }
}
