import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutCallbackOidcComponent } from './signout-callback-oidc.component';

describe('SignoutCallbackOidcComponent', () => {
  let component: SignoutCallbackOidcComponent;
  let fixture: ComponentFixture<SignoutCallbackOidcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoutCallbackOidcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutCallbackOidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
