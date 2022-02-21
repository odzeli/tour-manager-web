import { Component } from '@angular/core';
import { AppHeaderService } from './services/app-header-service';
import { AuthGuard } from './guards/auth-guard';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private appHeaderService: AppHeaderService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.appHeaderService.selectData().subscribe(
      res => {
        this.appHeaderState = res;
        if (res != null) {
          this.addTouristAvailable = this.appHeaderState.extraButtons.includes('addTourist');
          this.addTourAvailable = this.appHeaderState.extraButtons.includes('addTour');
          this.authenticated = this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot);
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
