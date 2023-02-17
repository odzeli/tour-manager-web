import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatingTourComponent } from './creating-tour/creating-tour.component';
import { CreatingTouristComponent } from './creating-tourist/creating-tourist.component';
import { ListTouristComponent } from './list-tourist/list-tourist.component';
import { MainPanelComponent } from './admin-part/main-panel/main-panel.component';
import { ColumnSettingsComponent } from './admin-part/column-settings/column-settings.component';
import { SigninCallbackOidcComponent } from './identity/signin-callback-oidc/signin-callback-oidc.component';
import { OidcAuthGuard } from './guards/oidc-auth-guard';

const appRoutes: Routes = [

  //oidc
  { path: 'signin-callback', component: SigninCallbackOidcComponent },

  // { path: '', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [OidcAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [OidcAuthGuard] },
  { path: 'list-tourists/:tourId', component: ListTouristComponent, canActivate: [OidcAuthGuard] },
  { path: 'creating-tour', component: CreatingTourComponent, canActivate: [OidcAuthGuard] },
  { path: 'creating-tourist/:tourId', component: CreatingTouristComponent, canActivate: [OidcAuthGuard] },
  { path: 'admin-part', component: MainPanelComponent, canActivate: [OidcAuthGuard] },
  { path: 'admin-part/column-settings', component: ColumnSettingsComponent, canActivate: [OidcAuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
