import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tour } from '../models/tour';
import { DashboardService } from '../services/dashboard-service'
import { AppHeaderService } from '../services/app-header-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  tours: Tour[];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private appHeaderService: AppHeaderService,
  ) { }

  ngOnInit(): void {

    this.dashboardService.allTours().subscribe(data => {
      this.tours = data;
      const headerState = {pageName: "Список туров", extraButtons: ['addTour'], }
      this.appHeaderService.setData(headerState);
    });

  }

}
