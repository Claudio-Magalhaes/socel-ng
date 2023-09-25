import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {LocacaoEntity} from "../locacao.entity";
import {environment} from "../../../../../environments/environment";
import {CLIENTE, CLIENTE_CONTATOS, CLIENTE_ENDERECOS, LOCACAO} from "../../../../_core/endpoints";
import {EnderecoEntity} from "../../clientes/_entitys/endereco.entity";
import {ContatoEntity} from "../../clientes/_entitys/contato.entity";
import {ClientesEntity} from "../../clientes/clientes.entity";
import {GenericService} from "../../../../services/generic-service/generic.service";

@Component({
  selector: 'app-locacao-insert-edit',
  templateUrl: './locacao-insert-edit.component.html',
  styleUrls: ['./locacao-insert-edit.component.scss']
})
export class LocacaoInsertEditComponent extends AbstractInsertEdit2<LocacaoEntity> implements OnInit {

  rootEntity = new LocacaoEntity()

  public form = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    contato: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    dataInicial: new FormControl('', [Validators.required]),
    dataFinal: new FormControl('', [Validators.required]),
    descricao: new FormControl(''),
    observacao: new FormControl(''),
  })

  public listClientes: ClientesEntity[] = [];
  public listContato: ContatoEntity[] = [];
  public listEndereco: EnderecoEntity[] = [];

  constructor(
    public config: InsertEditConfig2,
    public service: GenericService
  ) {
    super(config, { path: environment.apiUrl, context: LOCACAO })

    this.service.get(CLIENTE).subscribe(
      resp => {
        this.listClientes = resp;
      }
    )

    this.form.controls['cliente'].valueChanges.subscribe(
      resp => {
        this.loadSelects(resp)
      }
    )
  }

  loadSelects(clienteId: number | string) {
    this.service.get(CLIENTE_CONTATOS, { params: { clienteId } }).subscribe(
      resp => {
        this.listContato = resp;
      }
    )

    this.service.get(CLIENTE_ENDERECOS, { params: { clienteId } }).subscribe(
      resp => {
        this.listEndereco = resp;
      }
    )

    this.form.controls['contato'].reset('');
    this.form.controls['endereco'].reset('');
  }

  override ngOnInit(): void {
    super.ngOnInit()
  }

  override afterFetchEntity() {
    this.form.patchValue({
      ...this.entity,
      cliente: this.entity.cliente?.id,
      contato: this.entity.contato?.id,
      endereco: this.entity.endereco?.id
    })
  }

  override beforeSaveEntity(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    const form = this.form.value;

    // @ts-ignore
    this.entity = {
      ...this.entity,
      ...form,
      cliente: { id: form.cliente },
      contato: { id: form.contato },
      endereco: { id: form.endereco }
    }

    return true;
  }

}
