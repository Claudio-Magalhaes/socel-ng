import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosInsertEditComponent } from './lancamentos-insert-edit.component';

describe('LancamentosInsertEditComponent', () => {
  let component: LancamentosInsertEditComponent;
  let fixture: ComponentFixture<LancamentosInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentosInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentosInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
