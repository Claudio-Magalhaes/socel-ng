import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoEntity} from "../lancamento.entity";
import {ModalLancamentoComponent} from "../sub-componsnts/modal-lancamento/modal-lancamento.component";
import {
  CdkDynamicTable,
  CdkDynamicTableService
} from "@datagrupo/dg-ng-util";

@Component({
  selector: 'app-lancamentos-main',
  templateUrl: './lancamentos-main.component.html',
  styleUrls: ['./lancamentos-main.component.scss']
})
export class LancamentosMainComponent implements OnInit {

  // @ViewChild('modalLancamentos') modal!: ModalLancamentoComponent;

  public table: CdkDynamicTable.tableClass;

  constructor(
    private CdkTable: CdkDynamicTableService
  ) {
    this.table = CdkTable.createByCrudEnity2(new LancamentoEntity(), {
      actions: {
        edit: {
          name: 'Editar',
          dbClick: true,
          action: (val: LancamentoEntity) => {

          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
