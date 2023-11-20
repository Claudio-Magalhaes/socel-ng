import {Component, HostListener, OnInit} from '@angular/core';
import {LocacaoEntity} from "../locacao.entity";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";
import {Router} from "@angular/router";
import {LocacaoService, receiveEventLocacaoActions} from "../service/locacao.service";
import {classesStatus, LocacaoTable} from "../locacao.table";

@Component({
  selector: 'app-locacao-main',
  templateUrl: './locacao-main.component.html',
  styleUrls: ['./locacao-main.component.scss']
})
export class LocacaoMainComponent implements OnInit {

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
  }

  constructor(
    private CdkTable: CdkDynamicTableService,
    private service: LocacaoService
  ) {
    this.table = CdkTable.createByCrudEnity2(new LocacaoEntity(), LocacaoTable);
  }

  ngOnInit(): void {
  }

  @HostListener('window:locacao-action-receive', ['$event'])
  receiveActionsTableLocacao(ev: CustomEvent<receiveEventLocacaoActions>) {
    this.service.receiveEventLocacaoActions(ev.detail, () => this.table.find())
  }

}
