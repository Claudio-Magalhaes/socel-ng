import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
import {LocacaoEntity} from "../locacao.entity";
import {environment} from "../../../../../environments/environment";
import {
  CLIENTE,
  CLIENTE_CONTATOS,
  CLIENTE_ENDERECOS,
  LOCACAO,
  LOCACAO_PRODUTOS,
  LOCACAO_SERVICOS
} from "../../../../_core/endpoints";
import {EnderecoEntity} from "../../clientes/_entitys/endereco.entity";
import {ContatoEntity} from "../../clientes/_entitys/contato.entity";
import {ClientesEntity} from "../../clientes/clientes.entity";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {CdkDynamicTable, CdkDynamicTableService} from "@datagrupo/dg-ng-util";
import {ProdutosEntity} from "../../produtos/produtos.entity";
import {ServicoEntity} from "../../servicos/servico.entity";

@Component({
  selector: 'app-locacao-insert-edit',
  templateUrl: './locacao-insert-edit.component.html',
  styleUrls: ['./locacao-insert-edit.component.scss']
})
export class LocacaoInsertEditComponent extends AbstractInsertEdit2<LocacaoEntity> implements OnInit {

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
    private CdkTable: CdkDynamicTableService
  ) {
    super(config)

    this.tableProtudos = this.CdkTable.create('request', {
      columns: [
        { name: 'nomeProduto', headerName: 'Produto', resource: val => val || '--' },
        { name: 'valorUnitatio', headerName: 'Valor Unidade' },
        { name: 'quantidade', headerName: 'Quantidade' },
        { name: 'subTotal', headerName: 'SubTotal' },
      ],
      apiData: {
        path: environment.apiUrl,
        context: LOCACAO_PRODUTOS
      }
    })

    this.tableServicos = this.CdkTable.create('request', {
      columns: [
        { name: 'nomeServico', headerName: 'Serviço', resource: val => val || '--' },
        { name: 'subTotal', headerName: 'valor' },
      ],
      apiData: { path: environment.apiUrl, context: LOCACAO_SERVICOS }
    })

    this.service.get(CLIENTE).subscribe(
      resp => {
        this.listClientes = resp.data;
      }
    )

    this.form.controls['cliente'].valueChanges.subscribe(
      resp => {
        this.loadSelects(resp)
      }
    )
  }

  loadSelects(cliente: number | string) {
    this.service.get(CLIENTE_CONTATOS, { params: { cliente } }).subscribe(
      resp => {
        this.listContato = resp.data;
      }
    )

    this.service.get(CLIENTE_ENDERECOS, { params: { cliente } }).subscribe(
      resp => {
        this.listEndereco = resp.data;
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
    this.tableServicos.controls.apiData.set({ params: { locacao: this.entity.id } })
    this.tableProtudos.controls.apiData.set({ params: { locacao: this.entity.id } })
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

  totaisTabelas(table: 'tableServicos' | 'tableProtudos') {
    // let total: number = 0;
  //   const list: any[] = this[table].data?.dataSource || [];
  //
  //   list.map((item: any) => {
  //     total = total + Number(item.valor) || 0
  //   })
  //
    return 0;
  }
}
