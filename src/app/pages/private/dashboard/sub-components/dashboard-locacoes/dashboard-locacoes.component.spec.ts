import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLocacoesComponent } from './dashboard-locacoes.component';

describe('DashboardLocacoesComponent', () => {
  let component: DashboardLocacoesComponent;
  let fixture: ComponentFixture<DashboardLocacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLocacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLocacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
