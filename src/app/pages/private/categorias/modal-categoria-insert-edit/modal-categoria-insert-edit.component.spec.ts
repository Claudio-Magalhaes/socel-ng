import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriaInsertEditComponent } from './modal-categoria-insert-edit.component';

describe('ModalCategoriaInsertEditComponent', () => {
  let component: ModalCategoriaInsertEditComponent;
  let fixture: ComponentFixture<ModalCategoriaInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategoriaInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoriaInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
