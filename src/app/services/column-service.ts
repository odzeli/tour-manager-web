import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SplittedColumns } from "../models/aboutColumn/splitted-columns";
import { StandardColumn } from "../models/aboutColumn/standard-column";
@Injectable()
export class ColumnService {

  baseUrl = "http://localhost:5000" + "/api/";

  constructor(private http: HttpClient) {

  }

  getColumnsCode(tourId: string) {
    return this.http.get<SplittedColumns>(`${this.baseUrl}Column/tour/${tourId}/columnsCode`);
  }

  standardColumns() {
    return this.http.get<StandardColumn[]>(`${this.baseUrl}Column/standardColumns`)
  }

  createStandardColumn(standardColumns: StandardColumn) {
    return this.http.post(`${this.baseUrl}Column/standardColumn/create`, standardColumns);
  }
}
