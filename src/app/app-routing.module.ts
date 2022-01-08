import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatingTourComponent } from './creating-tour/creating-tour.component';
import { CreatingTouristComponent } from './creating-tourist/creating-tourist.component';
import { ListTouristComponent } from './list-tourist/list-tourist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'list-tourists/:tourId', component: ListTouristComponent, canActivate: [AuthGuard] },
  { path: 'creating-tour', component: CreatingTourComponent, canActivate: [AuthGuard] },
  { path: 'creating-tourist/:tourId', component: CreatingTouristComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
