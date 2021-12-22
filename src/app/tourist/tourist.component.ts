import { Component, OnInit } from '@angular/core';
import { Tourist } from '../models/tourist';
import { TouristService } from '../services/tourist-service';

@Component({
  selector: 'app-tourist',
  templateUrl: './tourist.component.html',
  styleUrls: ['./tourist.component.scss']
})
export class TouristComponent implements OnInit {

  tourist: Tourist;

  constructor(private touristService: TouristService) {
  }

  ngOnInit(): void {
    this.touristService.getTourist()
      .subscribe((data: Tourist) => {
        this.tourist = data
      });
  }

}
