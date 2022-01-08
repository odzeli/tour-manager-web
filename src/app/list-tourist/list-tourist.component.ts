import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tourist } from '../models/tourist';
import { TouristService } from '../services/tourist-service';
import { TourService } from '../services/tour-service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-tourist',
  templateUrl: './list-tourist.component.html',
  styleUrls: ['./list-tourist.component.scss']
})
export class ListTouristComponent implements OnInit {
  tourId: string;
  tourists: Tourist[];
  displayedColumns: string[];
  touristDataSource: MatTableDataSource<Tourist>;
  tourStartDate: Date;

  constructor(
    private activatedRoute: ActivatedRoute,
    private touristService: TouristService,
    private tourService: TourService
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

    this.touristsList();

  }

  ngAfterViewInit() {
  }

  touristsList() {
    this.touristService.touristsList(this.tourId).subscribe(tourists => {
      this.tourists = tourists;
      this.initTable();
    });
  }

  initTable() {
    this.displayedColumns = [
      'name',
      'arrivalDateAndTime',
      'arrivalTransportType',
      'checkInDate',
      'departureDateAndTime',
      'departureTransportType',
      'checkOutDate',
      'tourDays',
      'hotelNights',
      'stars',
      'apartmentType',
      'phoneNumber',
      'addition',
      'hotel',
      'birthday',
      'passportNumber',
      'closePrice',
      'comment'];
    this.touristDataSource = new MatTableDataSource(this.tourists);
    this.touristDataSource.sort = this.sort;
  }

  update(el: Tourist, value: any, fieldName: string) {
    if (value == null) { return; }
    el[fieldName] = value;
    this.touristService.change(el).subscribe(
      res => {
      },
      err => { }
    );
  }

}
