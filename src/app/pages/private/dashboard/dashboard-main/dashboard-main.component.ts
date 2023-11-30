import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util"
import {LocacaoService, receiveEventLocacaoActions} from "../../locacao/service/locacao.service";
import {ModalLancamentoComponent} from "../../lancamentos/sub-components/modal-lancamento/modal-lancamento.component";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {LocacaoEntity} from "../../locacao/locacao.entity";
import {DASHBOARD_LOCACAO} from "../../../../_core/endpoints";

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
    this.locacoesAtrazadas = this.createTable.createByEntity(new LocacaoEntity(), {
      pagination: {
        size: 5
      },
      api: {
        context: DASHBOARD_LOCACAO,
        params: {atrazadas: true}
      },
      filters: { group: 'locacoesAtrazadas', filters: {} },
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
      filters: { filters: {}, group: 'locacoesNaoFaturada'},
      columns: { remove: ['dataInicial', 'total'] }
    })

    this.locacoesComecando = this.createTable.createByEntity(new LocacaoEntity(), {
      pagination: {
        size: 5
      },
      api: {
        context: DASHBOARD_LOCACAO,
        params: {aComecar: true}
      },
      filters: { filters: {}, group: 'locacoesAComecar'},
      columns: { remove: ['dataFinal', 'lancamento', 'total'] }
    })

    this.locacoesVencendo = this.createTable.createByEntity(new LocacaoEntity(), {
      pagination: {
        size: 5
      },
      api: {
        context: DASHBOARD_LOCACAO,
        params: { aVencer: true }
      },
      filters: { filters: {}, group: 'locacoesVencendo'},
      columns: { remove: ['dataInicial', 'lancamento', 'total'] }
    })
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
