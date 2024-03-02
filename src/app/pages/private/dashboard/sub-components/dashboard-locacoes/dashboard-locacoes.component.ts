import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ModalLancamentoComponent
} from "../../../lancamentos/sub-components/modal-lancamento/modal-lancamento.component";
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {LocacaoService, receiveEventLocacaoActions} from "../../../locacao/service/locacao.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {LocacaoEntity} from "../../../locacao/locacao.entity";
import {CLIENTE_FILTER, CLIENTE_NOME, DASHBOARD_LOCACAO} from "../../../../../_core/endpoints";
import {GenericService} from "../../../../../services/generic-service/generic.service";

@Component({
  selector: 'dashboard-locacoes',
  templateUrl: './dashboard-locacoes.component.html',
  styleUrls: ['./dashboard-locacoes.component.scss']
})
export class DashboardLocacoesComponent implements OnInit, OnDestroy {

  @ViewChild('modalLancamento') modalLancamento!: ModalLancamentoComponent;

  public currentDate: string;

  tabelaExibicao: 'atrasadas' | 'faturamento' | 'comecando' | 'vencendo' = 'atrasadas';

  clientesLists = {
    comecando: [],
    vencendo: [],
  }

  dataInTitleCard = {
    comecando: this.getBaseDate().split('-').reverse().join('/'),
    vencendo: this.getBaseDate().split('-').reverse().join('/'),
  }

  public filters = {
    vencendo: {
      prazoVencimento: new FormControl(''),
    },
    comecando: {
      totalDias: new FormControl('20'),
      prazoInicio: new FormControl('2023-12-21'),
    },
    dataStart: new FormControl(20)
  }

  formFiltersComecando = new FormGroup({
    totalDias: new FormControl(20),
    prazoInicio: new FormControl('2023-12-21'),
    cliente: new FormControl(''),
  })

  formFiltersvencendo = new FormGroup({
    totalDias: new FormControl(20),
    prazoVencimento: new FormControl('2023-12-21'),
    cliente: new FormControl(''),
  })

  public locacoesAtrazadas!: CdkDynamicTable.tableClass;
  public locacoesNaoFaturada!: CdkDynamicTable.tableClass;
  public locacoesVencendo!: CdkDynamicTable.tableClass;
  public locacoesComecando!: CdkDynamicTable.tableClass;

  constructor(
    private createTable: CdkDynamicTableService,
    private locacaoService: LocacaoService,
    private router: Router,
    private service: GenericService
  ) {
    this.createTables();
    this.currentDate = new Date().toLocaleDateString('pt-br').split('/').reverse().join('-');

    this.formFiltersComecando.controls['prazoInicio'].valueChanges.subscribe(
      resp => {
        if (!resp) return;

        const date = new Date();
        const newDate = new Date(resp)

        if (date > newDate) {
          return;
        }

        let timeDiff = Math.abs(date.getTime() - newDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        this.formFiltersComecando.patchValue({ totalDias: diffDays }, { emitEvent: false })
      }
    )
    this.formFiltersComecando.controls['totalDias'].valueChanges.subscribe(
      resp => {
        if (!resp) return;

        const date = new Date()
        date.setDate(date.getDate() + resp)
        this.formFiltersComecando.patchValue({
          prazoInicio: date.toLocaleDateString('pt-br').split('/').reverse().join('-')
        })
      }
    )

    this.formFiltersvencendo.controls['prazoVencimento'].valueChanges.subscribe(
      resp => {
        if (!resp) return;

        const date = new Date();
        const newDate = new Date(resp)

        let timeDiff = Math.abs(date.getTime() - newDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        this.formFiltersvencendo.patchValue({ totalDias: diffDays }, { emitEvent: false })
      }
    )
    this.formFiltersvencendo.controls['totalDias'].valueChanges.subscribe(
      resp => {
        if (!resp) return;

        const date = new Date()
        date.setDate(date.getDate() + resp)
        this.formFiltersvencendo.patchValue({
          prazoVencimento: date.toLocaleDateString('pt-br').split('/').reverse().join('-')
        })
      }
    )

    this.filterCliente('comecando', '');
    this.filterCliente('vencendo', '');
  }

  createTables() {
    const baseDate = this.getBaseDate();
    this.locacoesAtrazadas = this.createTable.createByEntity(new LocacaoEntity(), {
      pagination: {
        size: 5
      },
      api: {
        context: DASHBOARD_LOCACAO,
        params: {atrazadas: true}
      },
      filters: {group: 'locacoesAtrazadas', filters: {}},
      columns: {
        remove: ['dataInicial', 'lancamento', 'total']
      }
    })

    this.locacoesNaoFaturada = this.createTable.createByEntity(new LocacaoEntity(), {
      pagination: {
        size: 5
      },
      api: {
        context: DASHBOARD_LOCACAO,
        params: {naoFaturada: true}
      },
      filters: {filters: {}, group: 'locacoesNaoFaturada'},
      columns: {remove: ['dataInicial', 'total']}
    })

    this.locacoesVencendo = this.createTable.createByEntity(new LocacaoEntity(), {
      pagination: {
        size: 5
      },
      api: {
        context: DASHBOARD_LOCACAO,
        params: {aVencer: true}
      },
      filters: {group: 'locacoesVencendo', filters: {
        add: {
          prazoVencimento: { data: { prazoVencimento: baseDate } }
        }
        }},
      columns: {remove: ['dataInicial', 'lancamento', 'total']}
    })
    this.locacoesVencendo.controls.filters.setClearFunctions({prazoVencimento: baseDate})
    this.locacoesVencendo.observables.dataSource.subscribe(() => {
      this.dataInTitleCard.vencendo =
        (this.formFiltersvencendo.value.prazoVencimento || this.getBaseDate()).split('-').reverse().join('/');
    })

    this.locacoesComecando = this.createTable.createByEntity(new LocacaoEntity(), {
      pagination: {
        size: 5
      },
      api: {
        context: DASHBOARD_LOCACAO,
        params: {aComecar: true}
      },
      filters: {
        group: 'locacoesAComecar', filters: {
          add: {
            prazoInicio: {
              data: { prazoInicio: baseDate }
            }
          }
        }
      },
      columns: {remove: ['dataFinal', 'lancamento', 'total']}
    })
    this.locacoesComecando.controls.filters.setClearFunctions({prazoInicio: baseDate})
    this.locacoesComecando.observables.dataSource.subscribe(() => {
      this.dataInTitleCard.comecando =
        (this.formFiltersComecando.value.prazoInicio || this.getBaseDate()).split('-').reverse().join('/');
    })
  }

  ngOnInit(): void {
  }

  filterCliente(list: 'comecando' | 'vencendo', search: string) {
    this.service.get(CLIENTE_FILTER, { params: { nome: search } }).subscribe(
      resp => {
        this.clientesLists.comecando = resp.data;
      }
    )
  }

  ngOnDestroy(): void {
    this.locacoesAtrazadas.destroy()
    this.locacoesNaoFaturada.destroy()
    this.locacoesVencendo.destroy()
    this.locacoesComecando.destroy()
  }

  getBaseDate(type: 'br' | 'us' = 'us'): string {
    const date = new Date()
    date.setDate(date.getDate() + 20)
    return date.toLocaleDateString('pt-br').split('/').reverse().join('-')
  }

  @HostListener('window:locacao-action-receive', ['$event'])
  receiveActionsTableLocacao(ev: CustomEvent<receiveEventLocacaoActions>) {
    if (ev.detail.typeEvent == 'verLancamento') {
      if (!ev.detail.row?.lancamento) return;
      this.modalLancamento.open(ev.detail.row.lancamento)
    }

    this.locacaoService.receiveEventLocacaoActions(ev.detail, (resp?: any) => {
      if (ev.detail.typeEvent == 'faturar') {
        if (!resp.lancamento) return;
        this.modalLancamento.open(resp.lancamento)
      }
      if (ev.detail.typeEvent == 'renovar') {
        this.router.navigate(['user', 'locacao', ev.detail.row.id]).then()
      }

      this.locacoesAtrazadas.find()
      this.locacoesVencendo.find()
      this.locacoesNaoFaturada.find()
    })
  }
}
