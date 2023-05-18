import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourExpensesComponent } from './tour-expenses.component';

describe('TourExpensesComponent', () => {
  let component: TourExpensesComponent;
  let fixture: ComponentFixture<TourExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
