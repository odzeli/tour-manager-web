import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Tourist } from '../models/tourist';
import { ApartmentType } from '../models/enums/apartment-type';
import { TouristService } from '../services/tourist-service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TourService } from '../services/tour-service';

interface ApartmentOption {
  value: ApartmentType,
  viewValue: string
}

@Component({
  selector: 'app-creating-tourist',
  templateUrl: './creating-tourist.component.html',
  styleUrls: ['./creating-tourist.component.scss']
})
export class CreatingTouristComponent implements OnInit {
  creatingTouristForm: FormGroup;
  apartmentOptions: ApartmentOption[];
  selectedRoomType: ApartmentOption;
  tourId: string;
  tourStartDate: Date;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private touristService: TouristService,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.apartmentOptions = this.initApartmentDropDown();

    this.activatedRoute.paramMap.subscribe(params => {
      this.tourId = params.get("tourId");
    });

    this.tourService.getTourStartDate(this.tourId).subscribe(
      res => {
        this.tourStartDate = res;
      }
    );
  }

  initForm() {
    this.creatingTouristForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/[А-я]/)
      ]],
      phoneNumber: ['',
        [
          Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
        ]],
      birthday: [new Date()],
      passportNumber: [],
      arrivalDateAndTime: [new Date()],
      departureDateAndTime: [new Date()],
      checkInDate: [new Date()],
      checkOutDate: [new Date()],
      hotelNights: [],
      tourDays: [],
      stars: [],
      apartmentType: [],
      hotel: [],
      comment: [],
      closePrice: [],
      addition: [],
      arrivalTransportType: [],
      departureTransportType: []
    });
  }

  public onCancel = () => {
    this.location.back();
  }

  public addTourist(t: Tourist) {
    if (this.creatingTouristForm.valid) {
      let tourist: Tourist = {
        tourId: this.tourId,
        name: t.name,
        birthday: t.birthday,
        passportNumber: t.passportNumber,
        arrivalDateAndTime: t.arrivalDateAndTime,
        arrivalTransportType: t.arrivalTransportType,
        checkInDate: t.checkInDate,
        departureDateAndTime: t.departureDateAndTime,
        departureTransportType: t.departureTransportType,
        checkOutDate: t.checkOutDate,
        tourDays: 0,
        hotelNights: 0,
        stars: 0,
        apartmentType: 0,
        phoneNumber: t.phoneNumber,
        hotel: t.hotel,
        closePrice: 0,
        addition: t.addition,
        comment: t.comment,
        id: ''
      };

      tourist.id = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      this.touristService.setTourist(tourist).pipe(
        finalize(() => {
          this.onCancel();
        })
      ).subscribe();
    }
  }

  private initApartmentDropDown(): ApartmentOption[] {
    return [
      { value: ApartmentType.Single, viewValue: 'Single' },
      { value: ApartmentType.Double, viewValue: 'Double' },
      { value: ApartmentType.Twin, viewValue: 'Twin' },
    ]
  }
}
