import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoMainComponent } from './locacao-main.component';

describe('LocacaoMainComponent', () => {
  let component: LocacaoMainComponent;
  let fixture: ComponentFixture<LocacaoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocacaoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacaoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
