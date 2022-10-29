import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../../../shared/ui/modal/modal.component";
import {GenericService} from "../../../../../services/generic-service/generic.service";
import {CLIENTE_ENDERECOS} from "../../../../../_core/endpoints";
import {environment} from "../../../../../../environments/environment";
import {HttpHelperService} from "../../../../../services/http-helper/http-helper.service";
import {EnderecoEntity} from "../../_entitys/endereco.entity";
import {MockService} from "../../../../../services/mock/mock.service";

@Component({
  selector: 'subComponent-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss']
})
export class EnderecosComponent implements OnInit {

  @ViewChild('enderecosModal') modal!: ModalComponent;

  private edit = false;
  private idEndereco: number | string | undefined

  private dataMock: any[] = [];

  public form = new FormGroup({
    cep: new FormControl('',[Validators.required]),
    numero: new FormControl('',[Validators.required]),
    cidade: new FormControl(''),
    bairro: new FormControl(''),
    uf: new FormControl(''),
    rua: new FormControl(''),
    complemento: new FormControl('')
  });

  constructor(
    public service: MockService,
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

    this.getMock();
  }

  getMock() {
    this.service.getListData(CLIENTE_ENDERECOS, (data: EnderecoEntity[]) => this.dataMock = data)
  }

  ngOnInit(): void {
  }

  open(data?: EnderecoEntity) {

    if (!!data) {
      this.form.patchValue({
        ...data
      })
      this.idEndereco = data.id
      this.edit = true
      this.modal.open();
    } else {
      this.modal.open();
    }
  }

  saveOrUpdate(data: any) {
    if (this.edit) {
      data['id'] = this.idEndereco;
      return this.service.update(CLIENTE_ENDERECOS, data, this.dataMock)
      // return this.service.put('', data)
    } else {
      return this.service.save(CLIENTE_ENDERECOS, data, this.dataMock)
      // return this.service.post('', data)
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const data = {
      ...this.form.value,
    }

    this.saveOrUpdate(data).subscribe(
      resp => {
        window.dispatchEvent(new CustomEvent('dg-table-atualizar-event', { detail: 'enderecosEntity' }))
        this.getMock()
        this.modal.close()
      }
    )
  }

  close = () => {
    this.form.reset('');
    this.edit = false;
    this.idEndereco = undefined;
  }
}
