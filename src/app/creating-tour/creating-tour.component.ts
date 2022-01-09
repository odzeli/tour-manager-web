import { Component, OnInit, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__ } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TourForCreation } from '../models/abstract/tour-for-creation';
import { Location } from '@angular/common';
import { TourService } from '../services/tour-service';
import { Tour } from '../models/tour';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-creating-tour',
  templateUrl: './creating-tour.component.html',
  styleUrls: ['./creating-tour.component.scss']
})
export class CreatingTourComponent implements OnInit {

  public tourForm: FormGroup;

  constructor(private location: Location, private tourService: TourService) { }

  ngOnInit(): void {

    this.tourForm = new FormGroup({
      startDate: new FormControl(Validators.required),
      guides: new FormControl(''),
      drivers: new FormControl('')
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.tourForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createTour = (tourFormValue: Tour) => {
    if (this.tourForm.valid) {
      this.tourService.add(tourFormValue).pipe(
        finalize(() => {
          this.onCancel();
        })
      ).subscribe();
    }
  }

}
