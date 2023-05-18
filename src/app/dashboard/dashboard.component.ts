import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tour } from '../models/tour';
import { DashboardService } from '../services/api/dashboard-service'
import { AppHeaderService } from '../services/app-header-service';
import { IdentityAuthService } from '../identity/identity-auth.service';
import { TourService } from '../services/api/tour-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMenuComponent } from '../common-components/dialog-menu/dialog-menu.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  tours: Tour[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private tourService: TourService,
    private dashboardService: DashboardService,
    private appHeaderService: AppHeaderService,
    private identityAuthService: IdentityAuthService
  ) { }

  ngOnInit(): void {

    this.dashboardService.allTours().subscribe(data => {
      this.tours = data;
      const headerState = { pageName: "Список туров", extraButtons: ['addTour'], }
      this.appHeaderService.setData(headerState);
    });

  }

  public deleteTour(tourId: string) {
    const dialogRef = this.dialog.open(DialogMenuComponent);
    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.tours = this.tours.filter(t => t.id != tourId);
          this.tourService.deleteTour(tourId).subscribe();
        }
      })
  }

}
