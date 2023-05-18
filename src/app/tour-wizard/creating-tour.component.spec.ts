import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingTourComponent } from './creating-tour.component';

describe('CreatingTourComponent', () => {
  let component: CreatingTourComponent;
  let fixture: ComponentFixture<CreatingTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
