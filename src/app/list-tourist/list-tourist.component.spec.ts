import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTouristComponent } from './list-tourist.component';

describe('ListTouristComponent', () => {
  let component: ListTouristComponent;
  let fixture: ComponentFixture<ListTouristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTouristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
