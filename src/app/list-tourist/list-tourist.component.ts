import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tourist } from '../models/tourist';
import { TouristService } from '../services/api/tourist-service';
import { TourService } from '../services/api/tour-service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnService } from '../services/api/column-service';
import { ColumnValue } from '../models/aboutColumn/columnValue';
import { SplittedColumns } from '../models/aboutColumn/splitted-columns';
import { ColumnValueType } from '../models/enums/column-value-type';
import { AppHeaderService } from '../services/app-header-service';
import { Row } from '../models/aboutColumn/rows';
import { WellKnownColumns } from '../constants/well-known-columns';
import { Tour } from '../models/tour';
import { TouristsAmountPerDay } from '../models/tourist-amount-per-day';
import { TourMetaDataViewMode } from '../models/enums/tour-metadata-enum';

@Component({
  selector: 'app-list-tourist',
  templateUrl: './list-tourist.component.html',
  styleUrls: ['./list-tourist.component.scss']
})
export class ListTouristComponent implements OnInit {
  tourId: string;
  tourists: Tourist[];
  displayedColumns: SplittedColumns;
  touristDataSource: MatTableDataSource<Row>;
  tourMainInfo: Tour;
  touristRows: Row[] = [];
  tableInitialized: boolean = false;
  allColumns: string[] = [];
  touristIdField = 'touristId';
  columnValueType = ColumnValueType;
  columnCodeToNameMap: { [k: string]: string } = {};
  tourDataViewMode: number = TourMetaDataViewMode.TourMetadata;
  tourMetaDataViewMode = TourMetaDataViewMode;

  touristsAmountPerDay: TouristsAmountPerDay[] = [];
  tourStartDay: Date;
  tourEndDay: Date;

  constructor(
    private activatedRoute: ActivatedRoute,
    private touristService: TouristService,
    private tourService: TourService,
    private columnService: ColumnService,
    private appHeaderService: AppHeaderService,
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.tourId = params.get("tourId") as string;
    });

    this.tourService.tourMainInfo(this.tourId).subscribe(
      res => {
        this.tourMainInfo = res;
        const headerState = { pageName: `Список туристов от ${this.tourMainInfo.startDate}`, extraButtons: ['addTourist'], tourId: this.tourId };
        this.appHeaderService.setData(headerState);
      }
    );

    this.columnsCode(this.tourId);

  }

  columnsCode(tourId: string): void {
    this.columnService.getColumnsCode(tourId).subscribe(
      res => {
        this.displayedColumns = res;
        this.allColumns = [
          ...this.displayedColumns.stringColumns,
          ...this.displayedColumns.dateColumns,
          ...this.displayedColumns.integerColumns,
          ...this.displayedColumns.decimalColumns,
          ...this.displayedColumns.guidColumns,
          ...this.displayedColumns.boolColumns];

        this.touristsList();
      }
    );
  }

  touristsList(): void {
    this.touristService.touristRows(this.tourId)
      .subscribe(rowsValues => {
        rowsValues.forEach(rowValues => {
          let row = new Row();
          row.touristId = rowValues.touristId;
          rowValues.values.forEach(value => {
            row[value.columnCode] = value.value;
            this.columnCodeToNameMap[value.columnCode] = value.columnName;
          });
          this.touristRows.push(row);

        });
        this.calculateTouristsAmountPerDay();
        this.initTable();
      });
  }

  initTable(): void {
    this.touristDataSource = new MatTableDataSource(this.touristRows);
    this.tableInitialized = true;
    // this.touristDataSource.sort = this.sort;
  }

  update(touristId: any, columnCode: string, value: any, columnValueType: ColumnValueType, row: { [k: string]: any }): void {

    if (value == null) { return; }

    let columnValue = new ColumnValue();
    columnValue.columnCode = columnCode;
    columnValue.valueType = columnValueType;
    columnValue.value = value;
    row[columnCode] = value;

    this.touristService.update(this.tourId, touristId, columnCode, columnValue).subscribe();
  }

  isSticky(columnCode) {
    return columnCode == WellKnownColumns.touristName || columnCode == WellKnownColumns.touristPhone;
  }

  private calculateTouristsAmountPerDay() {
    let allTourDates = this.calculateAllTourDates();

    allTourDates.forEach(date => {
      this.touristsAmountPerDay.push({ date: new Date(date.valueOf()), touristAmount: 0 })
    })


    this.touristsAmountPerDay.forEach(amount => {
      let currentDate = amount.date.valueOf();
      for (let i in this.touristRows) {
        let row = this.touristRows[i];
        let startDate = new Date(row[WellKnownColumns.tourStartDate]).valueOf();
        let endDate = new Date(row[WellKnownColumns.tourEndDate]).valueOf();
        if (startDate <= currentDate && endDate >= currentDate) {
          amount.touristAmount++;
        }
      }
    })

  }

  private calculateAllTourDates(): Date[] {
    this.touristRows.forEach(row => {
      let startDate = new Date(row[WellKnownColumns.tourStartDate]);
      let endDate = new Date(row[WellKnownColumns.tourEndDate]);
      this.tourStartDay = this.tourStartDay == null ? new Date(startDate) : this.tourStartDay;
      this.tourEndDay = this.tourEndDay == null ? new Date(endDate) : this.tourEndDay;
      this.tourStartDay = startDate != null && startDate < this.tourStartDay ? new Date(startDate) : new Date(this.tourStartDay);
      this.tourEndDay = endDate != null && endDate > this.tourEndDay ? new Date(endDate) : new Date(this.tourEndDay);
    })

    let allTourDates: Date[] = [];
    let iterableDate: Date = new Date(this.tourStartDay);
    while (iterableDate <= this.tourEndDay) {
      allTourDates.push(new Date(iterableDate));
      iterableDate.setDate(iterableDate.getDate() + 1);
      iterableDate = new Date(iterableDate);
    }

    return allTourDates;
  }

}
