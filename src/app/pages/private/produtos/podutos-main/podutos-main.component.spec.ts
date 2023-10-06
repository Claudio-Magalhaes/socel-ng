import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodutosMainComponent } from './podutos-main.component';

describe('PodutosMainComponent', () => {
  let component: PodutosMainComponent;
  let fixture: ComponentFixture<PodutosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodutosMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodutosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
