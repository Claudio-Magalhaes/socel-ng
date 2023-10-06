import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {CLIENTE_ENDERECOS} from "../../../../../_core/endpoints";
import {environment} from "../../../../../../environments/environment";
import {HttpHelperService} from "../../../../../services/http-helper/http-helper.service";
import {EnderecoEntity} from "../../_entitys/endereco.entity";
import {DgModalComponent} from "../../../../../../../../../../../../datagrupo/_libs/libs-dg-ng-util/dist/dg-ng-util";

@Component({
  selector: 'subComponent-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss']
})
export class EnderecosComponent implements OnInit {

  @ViewChild('enderecosModal') modal!: DgModalComponent;

  @Input('idCliente') idCliente: number | string | undefined;

  @Output('afterSave') afterSave = new EventEmitter<void>()

  public form = new FormGroup({
    id: new FormControl(''),
    cep: new FormControl('',[Validators.required]),
    numero: new FormControl('',[Validators.required]),
    cidade: new FormControl(''),
    bairro: new FormControl(''),
    uf: new FormControl(''),
    rua: new FormControl(''),
    complemento: new FormControl('')
  });

  constructor(
    public service: GenericService,
    private httpHelper: HttpHelperService
  ) {
    this.form.controls['cep'].valueChanges.subscribe(
      cep => {
        httpHelper.getCep(cep, (resp: any) => {
          this.form.patchValue({
            cidade: resp.localidade,
            bairro: resp.bairro,
            uf: resp.uf,
            rua: resp.logradouro
          })
        })
      }
    )
  }

  ngOnInit(): void {
  }

  open(data?: EnderecoEntity) {
    if (!this.idCliente) return;

    if (!!data) {
      this.form.patchValue(data)
      this.modal.open();
    } else {
      this.modal.open();
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const form = this.form.value;
    const data = {
      ...this.form.value,
      cliente: this.idCliente
    }
    let request: any;

    if (!!form?.id) {
      request = this.service.put(CLIENTE_ENDERECOS + '/' + form.id, data)
    } else {
      // return this.service.save(CLIENTE_ENDERECOS, data, this.dataMock)
      request = this.service.post(CLIENTE_ENDERECOS, data)
    }

    request.subscribe(
      () => {
        this.modal.close()
        this.afterSave.emit()
      }
    )
  }

  close = () => {
    this.form.reset('');
  }
}
