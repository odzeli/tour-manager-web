import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingTouristComponent } from './creating-tourist.component';

describe('CreatingTouristComponent', () => {
  let component: CreatingTouristComponent;
  let fixture: ComponentFixture<CreatingTouristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingTouristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
