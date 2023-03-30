import { Component } from '@angular/core';
import { AppHeaderService } from './services/app-header-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityAuthService } from './identity/identity-auth.service';
import { User } from 'oidc-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appHeaderState: AppHeaderState;
  authenticated: boolean;
  addTouristAvailable: boolean;
  addTourAvailable: boolean;
  user: User

  public userAuthenticated = false;

  constructor(
    private appHeaderService: AppHeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private identityAuthService: IdentityAuthService
  ) {
// this.identityAuthService.loginChanged
//     .subscribe(userAuthenticated => {
//       this.userAuthenticated = userAuthenticated;
//     })
  }

  ngOnInit() {
    // this.identityAuthService.getUser()
    // .then(user => {
    //   this.user = user;
    // })

    this.appHeaderService.selectData().subscribe(
      res => {
        this.appHeaderState = res;
        if (res != null) {
          this.addTouristAvailable = this.appHeaderState.extraButtons.includes('addTourist');
          this.addTourAvailable = this.appHeaderState.extraButtons.includes('addTour');
          // this.authenticated = this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot);
        }
      }
    );
  }

}

export class AppHeaderState {
  pageName: string;
  extraButtons: string[];
  tourId: string;
}
