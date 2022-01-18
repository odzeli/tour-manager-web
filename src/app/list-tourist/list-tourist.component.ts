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

  constructor(
    private activatedRoute: ActivatedRoute,
    private touristService: TouristService,
    private tourService: TourService,
    private columnService: ColumnService,
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.tourId = params.get("tourId");
    });

    this.tourService.getTourStartDate(this.tourId).subscribe(
      res => {
        this.tourStartDate = res;
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
          row['touristId'] = rowValues.touristId;
          rowValues.values.forEach(value => {
            row[value.columnCode] = value.value;
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

  update(el: Tourist, value: any, fieldName: string): void {
    if (value == null) { return; }
    el[fieldName] = value;
    this.touristService.change(el).subscribe(
      res => {
      },
      err => { }
    );
  }

}
