import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tour } from "../models/tour"
import { Observable } from "rxjs";

@Injectable()
export class DashboardService {
  baseUrl = "http://localhost:5000/";

  constructor(private http: HttpClient) { }

  public allTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl + 'api/Dashboard/AllTours');
  }

}
