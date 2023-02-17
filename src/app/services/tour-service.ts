import { HttpClient } from "@angular/common/http";
import { Tour } from "../models/tour"
import { Column } from "../models/aboutColumn/column";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TourService {
  baseUrl = "http://localhost:5000" + "/api/Tour/";

  constructor(private http: HttpClient) { }

  public add(tour: Tour) {
    return this.http.post(this.baseUrl, tour);
  }
  public getTourStartDate(tourId: string){
    return this.http.get<Date>(this.baseUrl + "getTourStartDate/" + tourId);
  }
  public getColumns(tourId: string) {
    return this.http.get<Column[]>(this.baseUrl + 'getColumns/' + tourId);
  }
}
