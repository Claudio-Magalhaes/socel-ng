import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosMainComponent } from './servicos-main.component';

describe('ServicosMainComponent', () => {
  let component: ServicosMainComponent;
  let fixture: ComponentFixture<ServicosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
