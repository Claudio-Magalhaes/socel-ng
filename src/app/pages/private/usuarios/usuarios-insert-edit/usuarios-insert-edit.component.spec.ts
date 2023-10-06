import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosInsertEditComponent } from './usuarios-insert-edit.component';

describe('UsuariosInsertEditComponent', () => {
  let component: UsuariosInsertEditComponent;
  let fixture: ComponentFixture<UsuariosInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
