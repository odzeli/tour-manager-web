import { HttpClient } from "@angular/common/http";
import { TouristValues } from "../models/touristValues";
import { Row } from "../models/AboutColumn/rows";
import { ColumnValue } from "../models/aboutColumn/columnValue";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TouristService {
  // "http://localhost:5000"
  baseUrl = "https://tourmanagerapi.azurewebsites.net" + "/api/";


  constructor(private http: HttpClient){

  }

  getTourist() {
  }

  addTourist(touristValues: TouristValues){
    return this.http.post(this.baseUrl + 'Tourist', touristValues);
  }

  touristRows(tourId: string) {
    return this.http.get<Row[]>(this.baseUrl + 'Tourist/' + tourId + '/TouristRows/');
  }

  update(tourId: string, touristId: string, columnCode: string, value: ColumnValue) {
    return this.http.post(this.baseUrl + `Tourist/tour/${tourId}/tourist/${touristId}/column/${columnCode}`, value);
  }
}
