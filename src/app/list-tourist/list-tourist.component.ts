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

@Component({
  selector: 'app-list-tourist',
  templateUrl: './list-tourist.component.html',
  styleUrls: ['./list-tourist.component.scss']
})
export class ListTouristComponent implements OnInit {
  tourId: string;
  tourists: Tourist[];
  displayedColumns: string[];
  touristDataSource: MatTableDataSource<any[]>;
  tourStartDate: Date;
  rowsValues: any[] = [];
  tableInitialized: boolean = false;

  cells: any;
  columns: any;

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

  ngAfterViewInit() {
  }


  columnsCode(tourId: string): void {
    this.columnService.getColumnsCode(tourId).subscribe(
      res => {
        this.displayedColumns = res;
        this.touristsList();
        console.log(this.displayedColumns);
      }
    );
  }

  touristsList(): void {
    this.touristService.touristRows(this.tourId)
      .pipe(
        map((rows) => rows.map(row => row.values))
      )
      .subscribe(rowsValues => {
        rowsValues.forEach(values => {
          let row = []; //cells[{columnCode: value}]
          let cell: { [k: string]: any } = {};
          values.forEach(value => {
            cell[value.columnCode] = value.value;
            // row.push(cell);
          });
          this.rowsValues.push(cell);
        });
        console.log(this.rowsValues);
        this.initTable();
      });
  }

  initTable(): void {
    this.touristDataSource = new MatTableDataSource(this.rowsValues);
    this.tableInitialized = true;

    // this.touristDataSource = new MatTableDataSource(this.tourists);
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
