import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tourist } from '../models/tourist';
import { TouristService } from '../services/tourist-service';
import { TourService } from '../services/tour-service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Row } from '../models/AboutColumn/rows';
import { ColumnService } from '../services/column-service';
import { map, pluck } from 'rxjs/operators'
import { ColumnValue } from '../models/aboutColumn/columnValue';
import { SplittedColumns } from '../models/aboutColumn/splitted-columns';
import { ColumnValueType } from '../models/enums/column-value-type';
import { AppHeaderService } from '../services/app-header-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-tourist',
  templateUrl: './list-tourist.component.html',
  styleUrls: ['./list-tourist.component.scss']
})
export class ListTouristComponent implements OnInit {
  tourId: string;
  tourists: Tourist[];
  displayedColumns: SplittedColumns;
  touristDataSource: MatTableDataSource<any[]>;
  tourStartDate: Date;
  touristRows: any[] = [];
  tableInitialized: boolean = false;
  allColumns: string[] = [];
  touristIdField = 'touristId';
  columnValueType = ColumnValueType;
  columnCodeToNameMap: {[k: string]: string } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private touristService: TouristService,
    private tourService: TourService,
    private columnService: ColumnService,
    private appHeaderService: AppHeaderService,
    private datePipe: DatePipe,
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.tourId = params.get("tourId");
    });

    this.tourService.getTourStartDate(this.tourId).subscribe(
      res => {
        this.tourStartDate = res;
        const headerState = {pageName: `Список туристов от ${this.datePipe.transform(this.tourStartDate, 'dd/MM/yyyy')}`, extraButtons: ['addTourist'], tourId: this.tourId}
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
          ...this.displayedColumns.numberColumns,
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
          let row: { [k: string]: any } = {};
          this.touristIdField = 'touristId';
          row[this.touristIdField] = rowValues.touristId;
          rowValues.values.forEach(value => {
            row[value.columnCode] = value.value;
            this.columnCodeToNameMap[value.columnCode] = value.columnName;
          });
          this.touristRows.push(row);
        });
        this.initTable();
      });
  }

  initTable(): void {
    this.touristDataSource = new MatTableDataSource(this.touristRows);
    this.tableInitialized = true;
    // this.touristDataSource.sort = this.sort;
  }

  update(touristId: any, columnCode: string, value: any,  columnValueType: ColumnValueType, row: { [k: string]: any }): void {

    if (value == null) { return; }

    let columnValue = new ColumnValue();
    columnValue.columnCode = columnCode;
    columnValue.valueType = columnValueType;
    columnValue.value = value;
    row[columnCode] = value;

    this.touristService.update(this.tourId, touristId, columnCode, columnValue).subscribe(
      res => {

      },
      err => { }
    );
}

}
