import { Inject, Injectable } from "@angular/core";
import { Tourist } from "../models/tourist";
import { HttpClient } from "@angular/common/http";
import { APP_API_URL } from "../app-injection-tokens";
import { TouristValues } from "../models/touristValues";
import { Row } from "../models/AboutColumn/rows";

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

  change(tourist: Tourist) {
    return this.http.post(this.baseUrl + 'Tourist/ChangeTourist', tourist);
  }
}
