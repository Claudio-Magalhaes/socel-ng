import { Component, OnInit } from '@angular/core';
import {AbstractInsertEdit2, InsertEditConfig2} from "@datagrupo/dg-crud";
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
export class PodutosInsertEditComponent extends AbstractInsertEdit2<ProdutosEntity> implements OnInit {

  rootEntity = new ProdutosEntity();

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
    public config: InsertEditConfig2,
    private service: GenericService
  ) {
    super(config, { path: environment.apiUrl, context: PRODUTOS })
    service.get(CATEGORIAS).subscribe(
      resp => {
        this.listCategorias = resp;
      }
    )
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override afterFetchEntity() {
    this.form.patchValue({
      ...this.entity,
      categoria: this.entity.categoria
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
      categoria: form.categoria
    }

    return true;
  }

}
