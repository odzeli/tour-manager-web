import { Tour } from '../models/tour';
import { Component, Input, OnInit } from '@angular/core';
import { TouristsAmountPerDay } from '../models/tourist-amount-per-day';

@Component({
  selector: 'app-tour-metadata',
  templateUrl: './tour-metadata.component.html',
  styleUrls: ['./tour-metadata.component.scss']
})
export class TourMetadataComponent implements OnInit {

  @Input() touristsAmountPerDay: TouristsAmountPerDay;
  @Input() tourMainInfo: Tour;
  @Input() tourStartDay: Date;
  @Input() tourEndDay: Date;

  constructor() { }

  ngOnInit(): void {
  }

  public isToday(day: Date): boolean {
    return day == new Date(Date.now());
  }

}
