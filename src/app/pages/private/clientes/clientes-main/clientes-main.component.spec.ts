import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesMainComponent } from './clientes-main.component';

describe('ClientesMainComponent', () => {
  let component: ClientesMainComponent;
  let fixture: ComponentFixture<ClientesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
