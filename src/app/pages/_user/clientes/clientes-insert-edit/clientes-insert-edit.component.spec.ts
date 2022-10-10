import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesInsertEditComponent } from './clientes-insert-edit.component';

describe('ClientesInsertEditComponent', () => {
  let component: ClientesInsertEditComponent;
  let fixture: ComponentFixture<ClientesInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
