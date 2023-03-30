import { HttpClient } from "@angular/common/http";
import { TouristValues } from "../../models/touristValues";
import { Row } from "../../models/AboutColumn/rows";
import { ColumnValue } from "../../models/aboutColumn/columnValue";
import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";

@Injectable()
export class TouristService extends BaseService {

  touristApi = this.baseUrl + "/api/tourist"

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getTourist() {
  }

  addTourist(touristValues: TouristValues) {
    return this.http.post(this.touristApi, touristValues);
  }

  touristRows(tourId: string) {
    return this.http.get<Row[]>(this.touristApi + `/${tourId}/touristRows/`);
  }

  update(tourId: string, touristId: string, columnCode: string, value: ColumnValue) {
    return this.http.post(this.touristApi + `/tour/${tourId}/tourist/${touristId}/column/${columnCode}`, value);
  }
}
