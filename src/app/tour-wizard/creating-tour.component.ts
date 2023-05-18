import { Component, OnInit, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__ } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TourForCreation } from '../models/abstract/tour-for-creation';
import { Location } from '@angular/common';
import { TourService } from '../services/api/tour-service';
import { Tour } from '../models/tour';
import { finalize, tap } from 'rxjs/operators';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-creating-tour',
  templateUrl: './creating-tour.component.html',
  styleUrls: ['./creating-tour.component.scss']
})
export class CreatingTourComponent implements OnInit {

  public tourForm: FormGroup;
  tourId: string;

  constructor(
    private location: Location,
    private tourService: TourService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.tourId = this.route.snapshot.params.tourId;

    this.initializeForm();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.tourForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public saveTour = (tourFormValue: Tour) => {
    if (this.tourForm.valid) {
      tourFormValue.id = this.tourId;
      this.tourService.saveTour(tourFormValue, !!this.tourId).pipe(
        finalize(() => {
          this.onCancel();
        })
      ).subscribe();
    }
  }

  private initializeForm() {
    this.tourForm = new FormGroup({
      startDate: new FormControl(Validators.required),
      guides: new FormControl(''),
      drivers: new FormControl('')
    });

    if (this.tourId) {
      this.tourService.initializeTourEditing(this.tourId)
        .pipe(
          tap((tour) => {
            this.tourForm = new FormGroup({
              startDate: new FormControl(Validators.required),
              guides: new FormControl(tour.guides),
              drivers: new FormControl(tour.drivers)
            });
            this.tourForm.controls.startDate.setValue(new Date(tour.startDate));
          })
        )
        .subscribe()
    }
  }

}
