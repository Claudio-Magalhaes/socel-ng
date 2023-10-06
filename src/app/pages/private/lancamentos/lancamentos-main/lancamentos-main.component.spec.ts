import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosMainComponent } from './lancamentos-main.component';

describe('LancamentosMainComponent', () => {
  let component: LancamentosMainComponent;
  let fixture: ComponentFixture<LancamentosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentosMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
