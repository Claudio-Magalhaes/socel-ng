import {AbstractEntity2, DataServer} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {SERVICO} from "../../../_core/endpoints";
import {DynamicTableEntity, DynamicColumn} from "@datagrupo/dg-ng-util";
import {genereteDefaultActionTable} from "../../../_core/config/dg-ng-util/config-local-dynamic-table";

@DataServer({
  path: environment.apiUrl,
  context: SERVICO
})
@DynamicTableEntity({
  api: {
    path: environment.apiUrl,
    context: SERVICO
  },
  actions: {
    edit: {
      name: 'Editar',
      dbClick: true,
      action: (val: ServicoEntity) => {
        if (!val?.id) return;
        genereteDefaultActionTable.link(['user', 'servicos', val.id])
      }
    }
  },
  filters: {
    group: 'servicos', reactive: true, filters: {
      // nome: {
      //   findFunc: val => { return {nome: val} }
      // },
      // status: {
      //   findFunc: val => { return {status: val} }
      // }
    }
  },
  sort: true
})
export class ServicoEntity extends AbstractEntity2 {
  constructor(
    id?: number | string,
    nome?: string,
    valorBase?: number | string,
    descricao?: string,
    status?: boolean
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.valorBase = valorBase;
    this.descricao = descricao;
    this.status = !!status;
  }

  @DynamicColumn({ headerName: 'nome' })
  nome: string | undefined

  @DynamicColumn({ headerName: 'Valor Base' })
  valorBase: number | string | undefined

  @DynamicColumn({ headerName: 'Status', resource: val => !!val ? 'ATIVO' : 'INATIVO' })
  status: boolean = false


  descricao: string | undefined
}
