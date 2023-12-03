import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLocacaoComponent } from './print-locacao.component';

describe('PrintLocacaoComponent', () => {
  let component: PrintLocacaoComponent;
  let fixture: ComponentFixture<PrintLocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintLocacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
