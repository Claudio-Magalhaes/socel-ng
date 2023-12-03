import { Component, OnInit } from '@angular/core';
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {LOCACAO_PRINT} from "../../../../../_core/endpoints";
import {LocacaoEntity} from "../../locacao.entity";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-print-locacao',
  templateUrl: './print-locacao.component.html',
  styleUrls: ['./print-locacao.component.scss']
})
export class PrintLocacaoComponent implements OnInit {

  public locacao: LocacaoEntity | undefined;

  constructor(
    private servide: GenericService,
    private actRouter: ActivatedRoute
  ) {
    console.log(actRouter.snapshot.params)
    actRouter.params.subscribe(resp => {
      if (resp['id']) {
        this.servide.get(LOCACAO_PRINT + resp['id']).subscribe(
          resp => {
            this.locacao = resp.data;
            // window.print();
          }
        )
      }
    })
  }

  ngOnInit(): void {
  }

}
