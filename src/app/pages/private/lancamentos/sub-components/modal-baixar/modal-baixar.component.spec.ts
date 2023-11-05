import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBaixarComponent } from './modal-baixar.component';

describe('ModalBaixarComponent', () => {
  let component: ModalBaixarComponent;
  let fixture: ComponentFixture<ModalBaixarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBaixarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBaixarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
