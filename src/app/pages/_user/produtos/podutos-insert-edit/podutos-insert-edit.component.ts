import { Component, OnInit } from '@angular/core';
import {AbstractInsertEdit, InsertEditConfig} from "@datagrupo/dg-crud";
import {ProdutosEntity} from "../produtos.entity";
import {environment} from "../../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CATEGORIAS, PRODUTOS} from "../../../../_core/endpoints";
import {GenericService} from "../../../../services/generic-service/generic.service";
import {CategoriasEntity} from "../../categorias/categorias.entity";

@Component({
  selector: 'app-podutos-insert-edit',
  templateUrl: './podutos-insert-edit.component.html',
  styleUrls: ['./podutos-insert-edit.component.scss']
})
export class PodutosInsertEditComponent extends AbstractInsertEdit<ProdutosEntity> implements OnInit {

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    estoqueAtual: new FormControl(''),
    alertaEstoqueMinimo: new FormControl(''),
    disponivelSite: new FormControl(''),
    descricao: new FormControl(''),
  })

  public listCategorias: CategoriasEntity[] = [];

  constructor(
    public config: InsertEditConfig,
    private service: GenericService
  ) {
    super(config, { path: environment.apiUrl, context: PRODUTOS })
    service.get(CATEGORIAS).subscribe(
      resp => {
        this.listCategorias = resp.data;
      }
    )
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  initNewEntity(): void {
    this.entity = new ProdutosEntity();
  }

  override afterFetchEntity() {
    this.form.patchValue({
      ...this.entity,
      categoria: this.entity.categoria?.id
    })
  }

  override beforeSaveEntity(): boolean {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    const form = this.form.value;

    this.entity = {
      ...this.entity,
      ...form,
      categoria: { id: form.categoria }
    }

    return true;
  }

}
