import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientesService} from "../services/clientes/clientes.service";
import {ActivatedRoute} from "@angular/router";
import {ClientesEntity} from "../clientes.entity";
import {AbstractInsertEdit, InsertEditConfig} from "@datagrupo/dg-crud";
import {EnderecoEntity} from "../_entitys/endereco.entity";
import {ContatoEntity} from "../_entitys/contato.entity";
import {ContatoService} from "../services/contato/contato.service";
import {EnderecoService} from "../services/endereco/endereco.service";

@Component({
  selector: 'app-clientes-insert-edit',
  templateUrl: './clientes-insert-edit.component.html',
  styleUrls: ['./clientes-insert-edit.component.scss']
})
export class ClientesInsertEditComponent extends AbstractInsertEdit<ClientesEntity> implements OnInit {

  public enderecosEntity = new EnderecoEntity();
  public contatoEntity = new ContatoEntity()

  public form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    sexo: new FormControl(''),
    pessoa_fisica: new FormControl('1'),
    email: new FormControl(''),
    documento: new FormControl('')
  })

  constructor(
    public config: InsertEditConfig,
    public service: ClientesService,
    protected route: ActivatedRoute,
    public contatoS: ContatoService,
    public enderecoService: EnderecoService
  ) {
    super(config, { path: 'localhost:3000', context: 'clientes' });
    enderecoService.editEndpoint('findAll', { params: {} })
    contatoS.editEndpoint('findAll', { params: {} })
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  initNewEntity(): void {
    this.entity = new ClientesEntity();
  }

  override afterFetchEntity() {
    console.log(this.entity);
    this.form.patchValue({
      nome: this.entity.nome,
      sexo: this.entity.sexo,
      pessoa_fisica: this.entity.pessoa_fisica,
      email: this.entity.email,
      documento: this.entity.documento
    })
  }

  override beforeSaveEntity(): boolean {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return false;
    }
    const data = this.form.value;

    this.entity = {
      ...data
    }

    return true;
  }

}
