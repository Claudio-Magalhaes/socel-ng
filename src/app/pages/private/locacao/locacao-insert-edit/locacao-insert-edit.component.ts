import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocacaoEntity} from "../locacao.entity";
import {environment} from "../../../../../environments/environment";
import {
  CLIENTE,
  CLIENTE_CONTATOS,
  CLIENTE_ENDERECOS, CLIENTE_NOME,
  LOCACAO,
  LOCACAO_PRODUTOS,
  LOCACAO_SERVICOS
} from "../../../../_core/endpoints";
import {EnderecoEntity} from "../../clientes/_entitys/endereco.entity";
import {ContatoEntity} from "../../clientes/_entitys/contato.entity";
import {ClientesEntity} from "../../clientes/clientes.entity";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {ModalProdutoLocacaoComponent} from "../sub-components/modal-produto-locacao/modal-produto-locacao.component";
import {ModalServicoLocacaoComponent} from "../sub-components/modal-servico-locacao/modal-servico-locacao.component";
import Swal from "sweetalert2";
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-locacao-insert-edit',
  templateUrl: './locacao-insert-edit.component.html',
  styleUrls: ['./locacao-insert-edit.component.scss']
})
export class LocacaoInsertEditComponent extends AbstractInsertEdit2<LocacaoEntity> implements OnInit {

  @ViewChild('modalProduto') modalProduto!: ModalProdutoLocacaoComponent;
  @ViewChild('modalServico') modalServico!: ModalServicoLocacaoComponent;

  rootEntity = new LocacaoEntity()
  tableProtudos: CdkDynamicTable.tableClass;
  tableServicos: CdkDynamicTable.tableClass;

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
    public service: GenericService,
    private CdkTable: CdkDynamicTableService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(config)
    this.rootConfig.subscribeEntityAfterSave = false;

    this.tableProtudos = this.CdkTable.create('request', {
      columns: [
        {name: 'nomeProduto', headerName: 'Produto', resource: val => val || '--'},
        {name: 'valorUnitatio', headerName: 'Valor Unidade'},
        {name: 'quantidade', headerName: 'Quantidade'},
        {name: 'subTotal', headerName: 'SubTotal'},
      ],
      apiData: {
        path: environment.apiUrl,
        context: LOCACAO_PRODUTOS
      },
      actions: {
        edit: {name: 'Editar', action: val => this.modalProduto.open(val), dbClick: true},
        remove: {
          name: 'Remover', action: val => {
            Swal.fire({
              icon: 'question',
              title: 'Remover produto desta locação',
              showCancelButton: true,
              cancelButtonText: 'Calcenar'
            }).then(confirm => {
              if (confirm.isConfirmed) {
                this.service.delete(LOCACAO_PRODUTOS + '/' + val.id).subscribe(
                  resp => {
                    this.tableProtudos.find();
                    this.atualizaTotais();
                    Swal.fire({
                      icon: 'success',
                      title: 'Produto removido'
                    }).then()
                  }
                )
              }
            })
          }
        },
      }
    })
    this.tableServicos = this.CdkTable.create('request', {
      columns: [
        {name: 'nomeServico', headerName: 'Serviço', resource: val => val || '--'},
        {name: 'subTotal', headerName: 'valor'},
      ],
      apiData: {path: environment.apiUrl, context: LOCACAO_SERVICOS},
      actions: {
        edit: {name: 'Editar', action: val => this.modalServico.open(val), dbClick: true},
        remove: {
          name: 'Remover', action: val => {
            Swal.fire({
              icon: 'question',
              title: 'Remover servoço desta locação',
              showCancelButton: true,
              cancelButtonText: 'Calcenar'
            }).then(confirm => {
              if (confirm.isConfirmed) {
                this.service.delete(LOCACAO_SERVICOS + '/' + val.id).subscribe(
                  resp => {
                    this.tableServicos.find();
                    this.atualizaTotais();
                    Swal.fire({
                      icon: 'success',
                      title: 'Serviço removido'
                    }).then()
                  }
                )
              }
            })
          }
        },
      }
    })

    this.service.get(CLIENTE).subscribe(
      resp => {
        this.listClientes = resp.data;
      }
    )

    this.form.controls['cliente'].valueChanges.subscribe(
      resp => {
        if (!this.entity?.id) {
          this.loadSelects(resp)
        }
      }
    )
    this.form.controls['dataInicial'].valueChanges.subscribe(
      resp => {
        const date = new Date(resp)
        const dateFinal = new Date()
        dateFinal.setDate(date.getDate() + 30)

        this.form.patchValue({
          dataFinal: dateFinal.toLocaleString().split(', ')[0].split('/').reverse().join('-')
        })
      }
    )
  }

  loadSelects(cliente: number | string, reset: boolean = true) {
    this.service.get(CLIENTE_CONTATOS, {params: {cliente}}).subscribe(
      resp => {
        this.listContato = resp.data;
      }
    )

    this.service.get(CLIENTE_ENDERECOS, {params: {cliente}}).subscribe(
      resp => {
        this.listEndereco = resp.data;
      }
    )

    if (reset) {
      this.form.controls['contato'].reset('');
      this.form.controls['endereco'].reset('');
    }
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
    this.tableServicos.controls.apiData.set({params: {locacao: this.entity.id}})
    this.tableProtudos.controls.apiData.set({params: {locacao: this.entity.id}})

    if (!!this.entity?.cliente) {
      this.listClientes.push(this.entity.cliente)
    }

    this.form.controls['cliente'].disable();
    this.loadSelects(this.entity.cliente?.id || '', false)

    if (this.entity.status == 'FINALIZADO') {
      this.form.controls['contato'].disable();
      this.form.controls['endereco'].disable();
      this.form.controls['dataInicial'].disable();
      this.form.controls['dataFinal'].disable();
      this.form.controls['descricao'].disable();
      this.form.controls['observacao'].disable();
    }
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
      cliente: {id: form.cliente},
      contato: {id: form.contato},
      endereco: {id: form.endereco}
    }

    return true;
  }

  override afterSaveEntity(entityData: any) {
    this.router.navigate(['/user/locacoes/' + entityData.id]).then(() => {
      window.location.reload();
    })
  }

  atualizaTotais() {
    if (!this.entity.id) return;
    this.service.get(LOCACAO + '/total/' + this.entity.id).subscribe(
      resp => {
        this.entity = {
          ...this.entity,
          ...resp.data
        }
      }
    )
  }

  verifyEdit() {
    return ['ABERTO'].includes(this.entity.status || '')
  }

  findCliente(val:string) {
    this.service.get(CLIENTE_NOME + val).subscribe(
      resp => {
        this.listClientes = resp.data;
      }
    )
  }
}
