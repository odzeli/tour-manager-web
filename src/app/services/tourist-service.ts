import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APP_API_URL } from "../app-injection-tokens";
import { TouristValues } from "../models/touristValues";
import { Row } from "../models/AboutColumn/rows";
import { ColumnValue } from "../models/aboutColumn/columnValue";

@Injectable()
export class TouristService {

  baseUrl = this.appApi + "/api/";

  constructor(private http: HttpClient, @Inject(APP_API_URL) private appApi){

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
