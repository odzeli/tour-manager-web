import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { APP_API_URL } from "../app-injection-tokens";
import { SplittedColumns } from "../models/aboutColumn/splitted-columns";
import {StandardColumn} from "../models/aboutColumn/standard-column";
@Injectable()
export class ColumnService {

  baseUrl = this.appApi + "/api/";

  constructor(private http: HttpClient, @Inject(APP_API_URL) private appApi){

  }

  getColumnsCode(tourId: string){
    return this.http.get<SplittedColumns>(`${this.baseUrl}Column/tour/${tourId}/columnsCode`);
  }

  standardColumns(){
    return this.http.get<StandardColumn[]>(`${this.baseUrl}Column/standardColumns`)
  }

  createStandardColumn(standardColumns: StandardColumn){
    return this.http.post(`${this.baseUrl}Column/standardColumn/create`, standardColumns);
  }
}
