import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourMetadataComponent } from './tour-metadata.component';

describe('TourMetadataComponent', () => {
  let component: TourMetadataComponent;
  let fixture: ComponentFixture<TourMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
