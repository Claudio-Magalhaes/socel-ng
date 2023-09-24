import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnderecoEntity} from "../_entitys/endereco.entity";
import {ContatoEntity} from "../_entitys/contato.entity";
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {CdkDynamicTable, CdkDynamicTableService} from "dg-ng-util";
import {ClientesEntity} from "../clientes.entity";
import {ContatosComponent} from "../sub-components/contatos/contatos.component";

@Component({
  selector: 'app-clientes-insert-edit',
  templateUrl: './clientes-insert-edit.component.html',
  styleUrls: ['./clientes-insert-edit.component.scss']
})
export class ClientesInsertEditComponent extends AbstractInsertEdit2<ClientesEntity> implements OnInit {

  rootEntity = new ClientesEntity();

  public tableEnderecos: CdkDynamicTable.tableClass
  public tableContatos: CdkDynamicTable.tableClass

  // @ViewChild('enderecosModal') enderecosModal!: EnderecosComponent;
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
    public config: InsertEditConfig2,
    private cdkTable: CdkDynamicTableService
  ) {
    super(config, {backAfterSave: false})
    this.tableEnderecos = cdkTable.createByCrudEnity2(new EnderecoEntity())
    this.tableContatos = cdkTable.createByCrudEnity2(new ContatoEntity(), {
      actions: {
        edit: { name: 'Editar', dbClick: true, action: (val: ContatoEntity) => this.contatoModal.open(val) }
      }
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override initNewEntity(): void {
    this.entity = new ClientesEntity();
  }

  override afterFetchEntity(entityData: ClientesEntity) {
    this.form.patchValue(this.entity);
    this.tableEnderecos.controls.apiData.set({params: {empresa: entityData.id}})
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
