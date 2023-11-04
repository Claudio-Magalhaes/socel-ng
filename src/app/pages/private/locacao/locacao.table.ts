import {CdkDynamicTable} from "@datagrupo/dg-ng-util";
import {LocacaoEntity} from "./locacao.entity";

/**
 * Função para retornar cor de linha conforme a data de vencimento da locação
 * @param val
 * @param row
 */
export const classesStatus = (val: string, row: LocacaoEntity): string => {
  if (!row.dataFinal) return '';
  if (['FINALIZADO', 	'FINALIZADA', 'ABERTO', 'CANCELADO'].includes(row?.status || '')) return '';

  let dataFinal = new Date(row.dataFinal)
  let dataAtual = new Date();

  if (
    dataAtual.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) ==
    dataFinal.toLocaleDateString('pt-BR', { timeZone: 'UTC' }))
  {
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

}
