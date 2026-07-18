import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcursionDetailComponent } from './excursion-detail.component';

describe('ExcursionDetailComponent', () => {
  let component: ExcursionDetailComponent;
  let fixture: ComponentFixture<ExcursionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcursionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcursionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
