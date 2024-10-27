import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LocacaoEntity} from "../locacao.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {LocacaoService, receiveEventLocacaoActions} from "../service/locacao.service";
import {ModalLancamentoComponent} from "../../lancamentos/sub-components/modal-lancamento/modal-lancamento.component";
import {LancamentoEntity} from "../../lancamentos/lancamento.entity";

@Component({
  selector: 'app-locacao-main',
  templateUrl: './locacao-main.component.html',
  styleUrls: ['./locacao-main.component.scss']
})
export class LocacaoMainComponent implements OnInit, OnDestroy {

  @ViewChild('modalLancamento') modalLancamento!: ModalLancamentoComponent;

  table: CdkDynamicTable.tableClass;

  filters = {
    id: '',
    nomeCliente: '',
    status: '',
    dataInicial_inicio: '',
    dataInicial_fim: '',
    dataFinal_inicio: '',
    dataFinal_fim: '',
    renovada: '',
    faturada: '',
  };

  constructor(
    private CdkTable: CdkDynamicTableService,
    private service: LocacaoService,
    private router: Router
  ) {
    this.table = CdkTable.createByEntity(new LocacaoEntity(),
      {
        actions: {
          edit: {
            iniciar: {
              action: (row: LocacaoEntity) => {
                this.service.iniciar(row, (faturar) => {
                  this.table.find()
                  if (faturar) {
                    this.modalLancamento.addReceita(new LancamentoEntity(
                      undefined,
                      row.cliente,
                      row.total,
                      row.dataFinal,
                      undefined,
                      'Faturamento da locação '+row.id,
                      '',
                      '',
                      '',
                      false,
                      <LocacaoEntity>{ id: row.id },
                    ));
                  }
                })
              }
            },
            finalizar: {
              action: row => {
                this.service.finalizar(row.id, () => this.table.find())
              }
            },
            backToAberto: {
              action: row => this.service.previousStage(row.id, () => this.table.find())
            },
            backToLocacao: {
              action: row => this.service.previousStage(row.id, () => this.table.find())
            }
          }
        }
      }
    );
    this.table.controls.filters.patchValue({dataInicial_inicio: this.getPrimeiroDiaMes()});
    this.table.controls.filters.setClearFunctions({dataInicial_inicio: this.getPrimeiroDiaMes()})
  }

  ngOnInit(): void {
  }

  getPrimeiroDiaMes(): string {
    let date = new Date();
    let primeiroDia: any = new Date(date.getFullYear(), date.getMonth(), 1);
    primeiroDia = primeiroDia.toLocaleString().split(',')[0];
    primeiroDia = primeiroDia.split('/').reverse().join('-')

    return primeiroDia
  }

  @HostListener('window:locacao-nextStatus', ['$event'])
  receiveEventNextStage(ev: CustomEvent<number | string>) {
    if (!ev.detail) return;
    this.service.nextStage(ev.detail, () => {
      this.table.find()
    });
  }

  @HostListener('window:locacao-peviousStatus', ['$event'])
  receiveEventPeviousStage(ev: CustomEvent<number | string>) {
    if (!ev.detail) return;
    this.service.previousStage(ev.detail, () => {
      this.table.find()
    });
  }

  @HostListener('window:locacao-action-receive', ['$event'])
  receiveActionsTableLocacao(ev: CustomEvent<receiveEventLocacaoActions>) {
    if (ev.detail.typeEvent == 'verLancamento') {
      if (!ev.detail.row?.lancamento) return;
      this.modalLancamento.open(ev.detail.row.lancamento)
    }

    this.service.receiveEventLocacaoActions(ev.detail, (resp?: any) => {
      if (ev.detail.typeEvent == 'faturar') {
        if (!resp.lancamento) return;
        this.modalLancamento.open(resp.lancamento)
      }
      if (ev.detail.typeEvent == 'renovar') {
        console.log(resp)
        this.router.navigate(['user', 'locacoes', resp.id]).then()
      }
      this.table.find()
    })
  }

  ngOnDestroy(): void {
    this.table.destroy();
  }

  faturarLocacao(locacao: LocacaoEntity) {
    this.modalLancamento.addReceita(new LancamentoEntity(
      undefined,
      locacao.cliente,
      locacao.total,
      locacao.dataFinal,
      undefined,
      'Faturamento da locação '+locacao.id,
      '',
      '',
      '',
      false,
      <LocacaoEntity>{ id: locacao.id },
    ));
  }

}
