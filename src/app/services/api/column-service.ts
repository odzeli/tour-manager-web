import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";
import { HttpClient } from "@angular/common/http";
import { StandardColumn } from "../../models/aboutColumn/standard-column";
import { SplittedColumns } from "../../models/aboutColumn/splitted-columns";

@Injectable()
export class ColumnService extends BaseService {

  columnApi = this.baseUrl + "/api/column";

  constructor(private http: HttpClient) {
    super();
  }

  getColumnsCode(tourId: string) {
    return this.http.get<SplittedColumns>(`${this.columnApi}/tour/${tourId}/columnsCode`);
  }

  standardColumns() {
    return this.http.get<StandardColumn[]>(`${this.columnApi}/standardColumns`)
  }

  createStandardColumn(standardColumns: StandardColumn) {
    return this.http.post(`${this.columnApi}/standardColumn/create`, standardColumns);
  }
}
