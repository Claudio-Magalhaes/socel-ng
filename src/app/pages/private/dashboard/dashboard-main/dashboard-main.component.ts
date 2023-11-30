import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util"
import {LocacaoEntity} from "../../locacao/locacao.entity";
import {LocacaoTable} from "../../locacao/locacao.table";
import {LocacaoService, receiveEventLocacaoActions} from "../../locacao/service/locacao.service";
import {ModalLancamentoComponent} from "../../lancamentos/sub-components/modal-lancamento/modal-lancamento.component";
import {Router} from "@angular/router";
import {DASHBOARD_LOCACAO} from "../../../../_core/endpoints";
import {FormControl} from "@angular/forms";

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

  public filtrosLocacao = {
    dataStart: new FormControl(20)
  }

  createTables() {
    this.locacoesAtrazadas = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        context: DASHBOARD_LOCACAO,
        params: {atrazadas: true}
      },
      filters: {...LocacaoTable.filters, group: 'locacoesAtrazadas'}
    })
    this.locacoesAtrazadas.controls.columns.remove('dataInicial')
    this.locacoesAtrazadas.controls.columns.remove('lancamento')
    this.locacoesAtrazadas.controls.columns.remove('total')

    this.locacoesNaoFaturada = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        context: DASHBOARD_LOCACAO,
        params: {naoFaturada: true}
      },
      filters: {...LocacaoTable.filters, group: 'locacoesNaoFaturada'}
    })
    this.locacoesNaoFaturada.controls.columns.remove('dataInicial')
    this.locacoesNaoFaturada.controls.columns.remove('total')

    this.locacoesComecando = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        context: DASHBOARD_LOCACAO,
        params: {aComecar: true}
      },
      filters: {...LocacaoTable.filters, reactive: false, group: 'locacoesAComecar'}
    })
    this.locacoesComecando.controls.columns.remove('dataFinal')
    this.locacoesComecando.controls.columns.remove('lancamento')
    this.locacoesComecando.controls.columns.remove('total')

    this.locacoesVencendo = this.createTable.createByCrudEnity2(new LocacaoEntity(), {
      ...LocacaoTable,
      pagination: {
        size: 5
      },
      //@ts-ignore
      apiData: {
        context: DASHBOARD_LOCACAO,
        params: { aVencer: true }
      },
      filters: { ...LocacaoTable.filters, group: 'locacoesVencendo'}
    })
    this.locacoesVencendo.controls.columns.remove('dataInicial')
    this.locacoesVencendo.controls.columns.remove('lancamento')
    this.locacoesVencendo.controls.columns.remove('total')
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.locacoesAtrazadas.destroy()
    this.locacoesNaoFaturada.destroy()
    this.locacoesVencendo.destroy()
    this.locacoesComecando.destroy()
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
