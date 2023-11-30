import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LocacaoEntity} from "../locacao.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {LocacaoService, receiveEventLocacaoActions} from "../service/locacao.service";
import {ModalLancamentoComponent} from "../../lancamentos/sub-components/modal-lancamento/modal-lancamento.component";

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
    this.table = CdkTable.createByEntity(new LocacaoEntity());
    this.table.controls.filters.patchValue({ dataInicial_inicio: this.getPrimeiroDiaMes() });
    this.table.controls.filters.setClearFunctions({ dataInicial_inicio: this.getPrimeiroDiaMes() })
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

}
