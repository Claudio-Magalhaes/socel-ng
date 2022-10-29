import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissoesInsertEditComponent } from './permissoes-insert-edit.component';

describe('PermissoesInsertEditComponent', () => {
  let component: PermissoesInsertEditComponent;
  let fixture: ComponentFixture<PermissoesInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissoesInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissoesInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
