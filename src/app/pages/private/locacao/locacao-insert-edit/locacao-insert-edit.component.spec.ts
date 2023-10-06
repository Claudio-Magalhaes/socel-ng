import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoInsertEditComponent } from './locacao-insert-edit.component';

describe('LocacaoInsertEditComponent', () => {
  let component: LocacaoInsertEditComponent;
  let fixture: ComponentFixture<LocacaoInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocacaoInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacaoInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
