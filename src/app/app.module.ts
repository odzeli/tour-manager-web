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
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

//services
import { TourService } from './services/tour-service';
import { TouristService } from './services/tourist-service';
import { DashboardService } from './services/dashboard-service';

//custom components
import { DashboardComponent } from './dashboard/dashboard.component';
import { TouristComponent } from './tourist/tourist.component';
import { TourComponent } from './tour/tour.component';
import { CreatingTourComponent } from './creating-tour/creating-tour.component';
import { BackArrowComponent } from './common-components/back-arrow/back-arrow.component';
import { CreatingTouristComponent } from './creating-tourist/creating-tourist.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TouristComponent,
    TourComponent,
    CreatingTourComponent,
    BackArrowComponent,
    CreatingTouristComponent
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
    MatSelectModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  providers: [TouristService, TourService, DashboardService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
