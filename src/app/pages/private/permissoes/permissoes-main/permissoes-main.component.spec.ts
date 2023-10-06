import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissoesMainComponent } from './permissoes-main.component';

describe('PermissoesMainComponent', () => {
  let component: PermissoesMainComponent;
  let fixture: ComponentFixture<PermissoesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissoesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissoesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
