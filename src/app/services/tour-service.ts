import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tour } from "../models/tour"
import { APP_API_URL } from "../app-injection-tokens";

@Injectable()
export class TourService {
  baseUrl = this.appApi + "/api/Tour/";

  constructor(private http: HttpClient, @Inject(APP_API_URL) private appApi) { }

  public save(tour: Tour) {
    return this.http.post(this.baseUrl, tour);
  }
  public getTourStartDate(tourId: string){
    return this.http.get<Date>(this.baseUrl + "getTourStartDate/" + tourId);
  }
}
