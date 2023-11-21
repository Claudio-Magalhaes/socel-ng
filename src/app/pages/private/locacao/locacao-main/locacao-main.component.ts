import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {LocacaoEntity} from "../locacao.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {LocacaoService, receiveEventLocacaoActions} from "../service/locacao.service";
import {classesStatus, filters, LocacaoTable} from "../locacao.table";

@Component({
  selector: 'app-locacao-main',
  templateUrl: './locacao-main.component.html',
  styleUrls: ['./locacao-main.component.scss']
})
export class LocacaoMainComponent implements OnInit, OnDestroy {

  table: CdkDynamicTable.tableClass;

  filters = filters;

  constructor(
    private CdkTable: CdkDynamicTableService,
    private service: LocacaoService
  ) {
    this.table = CdkTable.createByCrudEnity2(new LocacaoEntity(), LocacaoTable);
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
    this.service.receiveEventLocacaoActions(ev.detail, () => this.table.find())
  }

  ngOnDestroy(): void {
    this.table.destroy();
  }

}
