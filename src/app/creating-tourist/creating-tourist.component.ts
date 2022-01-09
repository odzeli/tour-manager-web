import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Tourist } from '../models/tourist';
import { TouristService } from '../services/tourist-service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TourService } from '../services/tour-service';
import { Column } from '../models/column';
import { ColumnValueType } from '../models/enums/column-value-type';

@Component({
  selector: 'app-creating-tourist',
  templateUrl: './creating-tourist.component.html',
  styleUrls: ['./creating-tourist.component.scss']
})
export class CreatingTouristComponent implements OnInit {
  creatingTouristForm: FormGroup;
  tourId: string;
  tourStartDate: Date;
  columns: Column[];
  formInitiated: boolean;
  columnValueType = ColumnValueType;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private touristService: TouristService,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    // public columnValueType: ColumnValueType
  ) {

  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.tourId = params.get("tourId");
    });

    this.tourService.getTourStartDate(this.tourId).subscribe(
      res => {
        this.tourStartDate = res;
      }
    );

    this.tourService.getColumns(this.tourId).subscribe(
      res => {
        this.columns = res;
        this.initForm();
      }
    )
  }

  initForm() {
    this.creatingTouristForm = this.fb.group({});
    this.columns.forEach(c => {
      if (c.valueType == ColumnValueType.string)
        this.creatingTouristForm.addControl(c.code, this.fb.control(''));
    });
    this.formInitiated = true;
  }

  public onCancel = () => {
    this.location.back();
  }

  public addTourist(t: Tourist) {
    if (this.creatingTouristForm.valid) {
      let tourist: Tourist = {
        tourId: this.tourId,
        name: t.name,
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

}
