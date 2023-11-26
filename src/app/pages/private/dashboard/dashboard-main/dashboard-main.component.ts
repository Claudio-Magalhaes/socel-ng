import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {LocacaoEntity} from "../../locacao/locacao.entity";
import {LocacaoTable} from "../../locacao/locacao.table";
import {LocacaoService, receiveEventLocacaoActions} from "../../locacao/service/locacao.service";
import {ModalLancamentoComponent} from "../../lancamentos/sub-components/modal-lancamento/modal-lancamento.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, OnDestroy {

  @ViewChild('modalLancamento') modalLancamento!: ModalLancamentoComponent;

  public locacoesAtrazadas!: CdkDynamicTable.tableClass;
  public locacoesNaoFaturada!: CdkDynamicTable.tableClass;
  public locacoesVencendo!: CdkDynamicTable.tableClass;
  public locacoesComecando!: CdkDynamicTable.tableClass;

  constructor(
    private createTable: CdkDynamicTableService,
    private locacaoService: LocacaoService,
    private router: Router
  ) {
    this.createTables();
  }

  createTables() {
    this.locacoesAtrazadas = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        params: { atrazadas: true }
      },
      filters: { ...LocacaoTable.filters, group: 'locacoesAtrazadas'}
    })
    this.locacoesAtrazadas.controls.columns.remove('dataInicial')
    this.locacoesAtrazadas.controls.columns.remove('lancamento')
    this.locacoesAtrazadas.controls.columns.remove('total')

    this.locacoesVencendo = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        params: { atrazada: true }
      },
      filters: { ...LocacaoTable.filters, group: 'locacoesVencendo'}
    })
    this.locacoesVencendo.controls.columns.remove('dataInicial')
    this.locacoesVencendo.controls.columns.remove('lancamento')
    this.locacoesVencendo.controls.columns.remove('total')

    this.locacoesNaoFaturada = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        params: { naoFaturada: true }
      },
      filters: { ...LocacaoTable.filters, group: 'locacoesNaoFaturada'}
    })
    this.locacoesNaoFaturada.controls.columns.remove('dataInicial')
    // this.locacoesNaoFaturada.controls.columns.remove('lancamento')
    this.locacoesNaoFaturada.controls.columns.remove('total')

    this.locacoesComecando = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        params: { naoFaturada: true }
      },
      filters: { ...LocacaoTable.filters, group: 'locacoesComecando'}
    })
    this.locacoesComecando.controls.columns.remove('dataInicial')
    this.locacoesComecando.controls.columns.remove('lancamento')
    this.locacoesComecando.controls.columns.remove('total')
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.locacoesAtrazadas.destroy()
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
