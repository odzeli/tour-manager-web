import { HttpClient } from "@angular/common/http";
import { Tour } from "../../models/tour"
import { Column } from "../../models/aboutColumn/column";
import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";

@Injectable()
export class TourService extends BaseService {

  tourApi = this.baseUrl + "/api/tour";

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public add(tour: Tour) {
    return this.http.post(this.tourApi, tour);
  }
  public getTourStartDate(tourId: string) {
    return this.http.get<Date>(this.tourApi + "/getTourStartDate/" + tourId);
  }
  public getColumns(tourId: string) {
    return this.http.get<Column[]>(this.tourApi + '/getColumns/' + tourId);
  }
}
