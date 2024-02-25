import {AbstractEntity2, CrudEntity, DataServer} from "@datagrupo/dg-crud";
import {environment} from "../../../../environments/environment";
import {PERMISSAO} from "../../../_core/endpoints";
import {DynamicTableEntity, DynamicColumn} from "@datagrupo/dg-ng-util";

export declare type permissoes = {
  cliente: {
    ver: boolean,
    adicionar: boolean,
    editar: boolean,
    remover: boolean,

    contato_adicionar: boolean,
    contato_editar: boolean,
    contato_remover: boolean,

    endereco_adicionar: boolean,
    endereco_editar: boolean,
    endereco_remover: boolean,
  },
  produto: {
    ver: boolean,
    adicionar: boolean,
    editar: boolean,
    remover: boolean,
  },
  servico: {
    ver: boolean,
    adicionar: boolean,
    editar: boolean,
    remover: boolean,
  },
  locacao: {
    ver: boolean,
    adicionar: boolean,
    editar: boolean,
    remover: boolean,
  },
  lancamentos: {
    ver: boolean,
    adicionar: boolean,
    editar: boolean,
    remover: boolean,
  }
}

@CrudEntity({
  api: {
    path: environment.apiUrl,
    context: PERMISSAO
  }
})
@DynamicTableEntity({
  api: {
    path: environment.apiUrl,
    context: PERMISSAO
  },
  actions: {
    edit: {
      name: 'Editar',
      dbClick: true,
      action: (val: PermissaoEntity) => {
        // this.router.navigate(['user', 'configuracoes', 'permissoes', val?.id]).then()
      }
    }
  }
})
export class PermissaoEntity extends AbstractEntity2 {

  constructor(
    id?: number | string,
    nome?: string,
    permissoes?: permissoes
  ) {
    super();
    this.id = id;
    this.nome = nome;

    if (!!permissoes) {
      this.permissoes = permissoes;
    }
  }

  @DynamicColumn({ headerName: 'Nome' })
  public nome: string | undefined;
  permissoes: permissoes = {
    cliente: {
      ver: false,
      adicionar: false,
      editar: false,
      remover: false,

      contato_adicionar: false,
      contato_editar: false,
      contato_remover: false,

      endereco_adicionar: false,
      endereco_editar: false,
      endereco_remover: false,
    },
    produto: {
      ver: false,
      adicionar: false,
      editar: false,
      remover: false,
    },
    servico: {
      ver: false,
      adicionar: false,
      editar: false,
      remover: false,
    },
    locacao: {
      ver: false,
      adicionar: false,
      editar: false,
      remover: false,
    },
    lancamentos: {
      ver: false,
      adicionar: false,
      editar: false,
      remover: false,
    }
  };
}
