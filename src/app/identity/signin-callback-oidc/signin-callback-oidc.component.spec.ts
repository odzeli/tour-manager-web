import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninCallbackOidcComponent } from './signin-callback-oidc.component';

describe('SigninCallbackOidcComponent', () => {
  let component: SigninCallbackOidcComponent;
  let fixture: ComponentFixture<SigninCallbackOidcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninCallbackOidcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninCallbackOidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
