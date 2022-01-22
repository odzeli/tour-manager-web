import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Material
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getMatInputUnsupportedTypeError, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';

//defferent components
import { SatPopoverModule } from '@ncstate/sat-popover';
import { DatepickerModule } from 'ng2-datepicker';

//services
import { TourService } from './services/tour-service';
import { TouristService } from './services/tourist-service';
import { DashboardService } from './services/dashboard-service';
import { AppHeaderService } from './services/app-header-service';

//custom components
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatingTourComponent } from './creating-tour/creating-tour.component';
import { BackArrowComponent } from './common-components/back-arrow/back-arrow.component';
import { CreatingTouristComponent } from './creating-tourist/creating-tourist.component';
import { ListTouristComponent } from './list-tourist/list-tourist.component';
import { APP_API_URL, AUTH_API_URL } from './app-injection-tokens';
import { environment } from '../../src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { LogoutButtonComponent } from './common-components/logout-button/logout-button.component';
import { InlineEditComponent } from './list-tourist/inline-edit/inline-edit.component';
import { AuthGuard } from './guards/auth-guard';
import { ColumnService } from './services/column-service';
import { AdminSectionComponent } from './common-components/admin-part-button/admin-section.component';
import { MainPanelComponent } from './admin-part/main-panel/main-panel.component';
import { ColumnSettingsComponent } from './admin-part/column-settings/column-settings.component';
import { ColumnsComponent } from './admin-part/columns/columns.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreatingTourComponent,
    BackArrowComponent,
    CreatingTouristComponent,
    ListTouristComponent,
    LoginComponent,
    LogoutButtonComponent,
    InlineEditComponent,
    AdminSectionComponent,
    MainPanelComponent,
    ColumnSettingsComponent,
    ColumnsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTooltipModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    }),
    SatPopoverModule,
    DatepickerModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    MatButtonToggleModule,
    DragDropModule,
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatStepperModule,
  ],
  providers: [
    AuthGuard, TouristService, TourService, DashboardService, ColumnService, AppHeaderService,
    { provide: AUTH_API_URL, useValue: environment.authApi },
    { provide: APP_API_URL, useValue: environment.appApi }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
