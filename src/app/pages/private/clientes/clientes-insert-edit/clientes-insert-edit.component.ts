import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnderecoEntity} from "../_entitys/endereco.entity";
import {ContatoEntity} from "../_entitys/contato.entity";
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {ClientesEntity} from "../clientes.entity";
import {ContatosComponent} from "../sub-components/contatos/contatos.component";
import {EnderecosComponent} from "../sub-components/enderecos/enderecos.component";
import Swal from "sweetalert2";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {environment} from "../../../../../environments/environment";
import {CLIENTE_CONTATOS, CLIENTE_ENDERECOS} from "../../../../_core/endpoints";

@Component({
  selector: 'app-clientes-insert-edit',
  templateUrl: './clientes-insert-edit.component.html',
  styleUrls: ['./clientes-insert-edit.component.scss']
})
export class ClientesInsertEditComponent extends AbstractInsertEdit2<ClientesEntity> implements OnInit {

  rootEntity = new ClientesEntity();

  public tableEnderecos: CdkDynamicTable.tableClass
  public tableContatos: CdkDynamicTable.tableClass

  @ViewChild('enderecosModal') enderecosModal!: EnderecosComponent;
  @ViewChild('contatoModal') contatoModal!: ContatosComponent;

  public form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    sexo: new FormControl(''),
    tipoPessoa: new FormControl('1'),
    // email: new FormControl(''),
    documento: new FormControl('')
  });

  public contato = new FormGroup({

  })

  constructor(
    public config: InsertEditConfig2,
    private cdkTable: CdkDynamicTableService,
    private service: GenericService
  ) {
    super(config, {backAfterSave: false})
    service.changePath(environment.apiUrl);
    this.tableEnderecos = cdkTable.createByEntity(new EnderecoEntity(), {
      // actions: {
      //   edit: { name: 'Editar', dbClick: true, action: (val: EnderecoEntity) => this.enderecosModal.open(val) },
      //   principal: { name: 'Tornar principal', action: (val: EnderecoEntity) => {
      //       Swal.fire({
      //         icon: 'question',
      //         title: 'Tornar esse contato o principal?',
      //         text: 'Isso fará o contato aparecer no perfil desse cliente',
      //         showCancelButton: true
      //       }).then(resp => {
      //         if (resp.isConfirmed) {
      //           this.service.patch(CLIENTE_ENDERECOS + '/principal', { cliente: this.entity.id, id: val.id }).subscribe(
      //             resp => {
      //               this.entity.endereco = val;
      //               this.tableEnderecos.find();
      //             }
      //           )
      //         }
      //       })
      //     }
      //   }
      // }
    })
    this.tableContatos = cdkTable.createByEntity(new ContatoEntity())
    this.tableContatos.controls.actions.setObject({
      edit: { name: 'Editar', dbClick: true, action: (val: ContatoEntity) => this.contatoModal.open(val) },
      principal: { name: 'Tornar principal', action: (val: ContatoEntity) => {
        Swal.fire({
          icon: 'question',
          title: 'Tornar esse contato o principal?',
          text: 'Isso fará o contato aparecer no perfil desse cliente',
          showCancelButton: true
        }).then(resp => {
          if (resp.isConfirmed) {
            this.service.patch(CLIENTE_CONTATOS + '/principal', { cliente: this.entity.id, id: val.id }).subscribe(
              resp => {
                this.entity.contato = val;
                this.tableContatos.find();
              }
            )
          }
        })
        }
      }
    })

    this.form.controls['tipoPessoa'].valueChanges.subscribe(resp => {
      this.form.controls['sexo'][resp != 'FISICA' ? 'disable' : 'enable']()
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
    this.tableEnderecos.controls.apiData.set({params: {cliente: entityData.id}});
    this.tableContatos.controls.apiData.set({params: {cliente: entityData.id}});
  }

  override afterSaveEntity(entityData: any) {
    this.tableEnderecos.controls.apiData.set({params: {cliente: entityData.id}});
    this.tableContatos.controls.apiData.set({params: {cliente: entityData.id}});
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
