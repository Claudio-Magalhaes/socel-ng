import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaInsertEditComponent } from './categoria-insert-edit.component';

describe('CategoriaInsertEditComponent', () => {
  let component: CategoriaInsertEditComponent;
  let fixture: ComponentFixture<CategoriaInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaInsertEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
