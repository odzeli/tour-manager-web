import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TouristComponent } from './tourist/tourist.component';
import { TourComponent } from './tour/tour.component';
import { CreatingTourComponent } from './creating-tour/creating-tour.component';
import { CreatingTouristComponent } from './creating-tourist/creating-tourist.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tour', component: TourComponent },
  //  {path: 'tourists', component: ListTuoristComponent}
  { path: 'tourist', component: TouristComponent },
  { path: 'creating-tour', component: CreatingTourComponent },
  { path: 'creating-tourist/:tourId', component: CreatingTouristComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
