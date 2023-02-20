import { HttpClient } from "@angular/common/http";
import { Tour } from "../models/tour"
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // "http://localhost:5000"
  baseUrl = "https://tourmanagerapi.azurewebsites.net"  + "/api/";

  constructor(private http: HttpClient) { }

  public allTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl + 'Dashboard/AllTours');
  }

}
