import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { TouristService } from '../services/api/tourist-service';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../services/api/tour-service';
import { Column } from '../models/aboutColumn/column';
import { ColumnValueType } from '../models/enums/column-value-type';
import { ColumnValue } from '../models/aboutColumn/columnValue';
import { TouristValues } from '../models/touristValues';
import { AppHeaderService } from '../services/app-header-service';

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

  stringColumns: Column[] = [];
  numberColumns: Column[] = [];
  dateColumns: Column[] = [];
  date = new Date();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private touristService: TouristService,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private appHeaderService: AppHeaderService,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.creatingTouristForm = this.fb.group({});

    this.activatedRoute.paramMap.subscribe(params => {
      this.tourId = params.get("tourId") as string;
    });

    this.tourService.getTourStartDate(this.tourId).subscribe(
      res => {
        this.tourStartDate = res;
        const headerState = {
          pageName: `Добавление туриста в тур от ${this.datePipe.transform(this.tourStartDate, 'dd/MM/yyyy')}`,
          extraButtons: ['']
        }
        this.appHeaderService.setData(headerState);
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
    let today = new Date();
    this.columns.forEach(c => {
      if (c.valueType == ColumnValueType.string) {
        this.stringColumns.push(c);
        this.creatingTouristForm.addControl(c.code, this.fb.control(''));
      }
      if (c.valueType == ColumnValueType.int || c.valueType == ColumnValueType.decimal) {
        this.numberColumns.push(c);
        this.creatingTouristForm.addControl(c.code, this.fb.control(''));
      }
      if (c.valueType == ColumnValueType.dateTime) {
        this.dateColumns.push(c);
        this.creatingTouristForm.addControl(c.code, this.fb.control(today));
      }
    });
  }

  public onCancel = () => {
    this.location.back();
  }

  public addTourist(columns: any) {
    let touristValues = new TouristValues();
    touristValues.tourId = this.tourId;
    touristValues.columnValues = [];
    if (this.creatingTouristForm.valid) {
      let properties = Object.getOwnPropertyNames(columns);
      properties.forEach(p => {
        let a = new ColumnValue();
        a.columnCode = p;
        touristValues.columnValues.push(a);
      });
      touristValues.columnValues.forEach(c => {
        c.value = columns[c.columnCode];
      });
    }
    this.touristService.addTourist(touristValues)
      .subscribe(
        res => {
          this.onCancel();
        }
      );
  }

}
