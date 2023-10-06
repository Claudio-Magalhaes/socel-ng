import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProdutoLocacaoComponent } from './modal-produto-locacao.component';

describe('ModalProdutoLocacaoComponent', () => {
  let component: ModalProdutoLocacaoComponent;
  let fixture: ComponentFixture<ModalProdutoLocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProdutoLocacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProdutoLocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
