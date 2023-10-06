import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosInsertEditComponent } from './servicos-insert-edit.component';

describe('ServicosInsertEditComponent', () => {
  let component: ServicosInsertEditComponent;
  let fixture: ComponentFixture<ServicosInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
