import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityAuthService } from '../identity-auth.service';

@Component({
  selector: 'app-signin-callback-oidc',
  templateUrl: './signin-callback-oidc.component.html',
  styleUrls: ['./signin-callback-oidc.component.scss']
})
export class SigninCallbackOidcComponent implements OnInit {

  constructor(private router: Router, private identityAuthService: IdentityAuthService) { }

  ngOnInit(): void {
    this.identityAuthService.completeAuthentication().then(() => {
      this.router.navigate(['dashboard']);
    });
  }

}
