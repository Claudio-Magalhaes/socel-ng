import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoEntity} from "../lancamento.entity";
import {ModalLancamentoComponent} from "../sub-componsnts/modal-lancamento/modal-lancamento.component";

@Component({
  selector: 'app-lancamentos-main',
  templateUrl: './lancamentos-main.component.html',
  styleUrls: ['./lancamentos-main.component.scss']
})
export class LancamentosMainComponent implements OnInit {

  @ViewChild('modalLancamentos') modal!: ModalLancamentoComponent;

  public entity = new LancamentoEntity()

  constructor() {
    this.entity.addActions([
      {
        name: 'Editar',
        action: (val: LancamentoEntity) => this.modal.open(val)
      }
    ])
  }

  ngOnInit(): void {
  }

}
