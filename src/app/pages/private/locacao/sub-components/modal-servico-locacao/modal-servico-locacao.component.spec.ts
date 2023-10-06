import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicoLocacaoComponent } from './modal-servico-locacao.component';

describe('ModalServicoLocacaoComponent', () => {
  let component: ModalServicoLocacaoComponent;
  let fixture: ComponentFixture<ModalServicoLocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalServicoLocacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServicoLocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
