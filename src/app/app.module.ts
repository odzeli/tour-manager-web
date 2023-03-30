import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';

//defferent components
import { SatPopoverModule } from '@ncstate/sat-popover';
import { DatepickerModule } from 'ng2-datepicker';
import { DatePipe } from '@angular/common';

//services
import { TourService } from './services/api/tour-service';
import { TouristService } from './services/api/tourist-service';
import { DashboardService } from './services/api/dashboard-service';
import { AppHeaderService } from './services/app-header-service';

//custom components
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatingTourComponent } from './creating-tour/creating-tour.component';
import { BackArrowComponent } from './common-components/back-arrow/back-arrow.component';
import { CreatingTouristComponent } from './creating-tourist/creating-tourist.component';
import { ListTouristComponent } from './list-tourist/list-tourist.component';
import { LogoutButtonComponent } from './common-components/logout-button/logout-button.component';
import { InlineEditComponent } from './list-tourist/inline-edit/inline-edit.component';
import { OidcAuthGuard } from './guards/oidc-auth-guard';
import { ColumnService } from './services/api/column-service';
import { AdminSectionComponent } from './common-components/admin-part-button/admin-section.component';
import { MainPanelComponent } from './admin-part/main-panel/main-panel.component';
import { ColumnSettingsComponent } from './admin-part/column-settings/column-settings.component';
import { ColumnsComponent } from './admin-part/columns/columns.component';
import { SigninCallbackOidcComponent } from './identity/signin-callback-oidc/signin-callback-oidc.component';
import { AuthInterceptor } from './guards/oidc-token-interceptor';
import { SignoutCallbackOidcComponent } from './identity/signout-callback-oidc/signout-callback-oidc.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreatingTourComponent,
    BackArrowComponent,
    CreatingTouristComponent,
    ListTouristComponent,
    LogoutButtonComponent,
    InlineEditComponent,
    AdminSectionComponent,
    MainPanelComponent,
    ColumnSettingsComponent,
    ColumnsComponent,
    SigninCallbackOidcComponent,
    SignoutCallbackOidcComponent,
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
    OidcAuthGuard, TouristService, TourService, DashboardService, ColumnService, AppHeaderService, DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
