import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodutosInsertEditComponent } from './podutos-insert-edit.component';

describe('PodutosInsertEditComponent', () => {
  let component: PodutosInsertEditComponent;
  let fixture: ComponentFixture<PodutosInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodutosInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodutosInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
