import { Component, OnInit } from '@angular/core';
import { IdentityAuthService } from '../../identity/identity-auth.service';
import { AppHeaderService } from '../../services/app-header-service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    private appHeaderService: AppHeaderService,
    private identityAuthService: IdentityAuthService
    ) { }

  ngOnInit(): void {
  }

  logout(){
    this.identityAuthService.signOut();
  }
}
