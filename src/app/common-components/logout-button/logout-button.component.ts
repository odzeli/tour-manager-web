import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../src/app/services/auth.service';
import { AppHeaderService } from '../../services/app-header-service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private appHeaderService: AppHeaderService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.appHeaderService.setData(null);
  }
}
