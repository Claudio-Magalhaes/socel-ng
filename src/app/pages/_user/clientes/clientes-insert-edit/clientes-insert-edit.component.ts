import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientesService} from "../services/clientes/clientes.service";
import {ActivatedRoute} from "@angular/router";
import {ClientesEntity} from "../clientes.entity";
import {AbstractInsertEdit, clearEntity, InsertEditConfig} from "@datagrupo/dg-crud";
import {EnderecoEntity} from "../_entitys/endereco.entity";
import {ContatoEntity} from "../_entitys/contato.entity";
import {ContatoService} from "../services/contato/contato.service";
import {EnderecoService} from "../services/endereco/endereco.service";
import {CLIENTE} from "../../../../_core/endpoints";
import {environment} from "../../../../../environments/environment";
import {EnderecosComponent} from "../sub-components/enderecos/enderecos.component";
import {ContatosComponent} from "../sub-components/contatos/contatos.component";

@Component({
  selector: 'app-clientes-insert-edit',
  templateUrl: './clientes-insert-edit.component.html',
  styleUrls: ['./clientes-insert-edit.component.scss']
})
export class ClientesInsertEditComponent extends AbstractInsertEdit<ClientesEntity> implements OnInit {

  @ViewChild('enderecosModal') enderecosModal!: EnderecosComponent;
  @ViewChild('contatoModal') contatoModal!: ContatosComponent;

  public enderecosEntity = new EnderecoEntity();
  public contatoEntity = new ContatoEntity()

  public tableParams = {}

  public form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    sexo: new FormControl(''),
    pessoa_fisica: new FormControl('1'),
    email: new FormControl(''),
    documento: new FormControl('')
  });

  public contato = new FormGroup({

  })

  constructor(
    public config: InsertEditConfig,
    protected route: ActivatedRoute,
  ) {
    super(config, { path: environment.apiUrl, context: CLIENTE });

    this.enderecosEntity.addActions([
      {
        name: 'Editar',
        action: (val: EnderecoEntity) => this.enderecosModal.open(val)
      }
    ])

    this.contatoEntity.addActions([
      {
        name: 'Editar',
        action: (val: ContatoEntity) => this.contatoModal.open(val)
      }
    ])
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
      ...this.entity
    });
    this.tableParams = { clienteId: this.entity.id }
  }

  override beforeSaveEntity(): boolean {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return false;
    }
    const data = this.form.value;

    // @ts-ignore
    this.entity = {
      ...this.entity,
      ...data
    }

    return true;
  }

}
