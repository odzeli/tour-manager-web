import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tour } from "../models/tour"
import { Observable } from "rxjs";
import { APP_API_URL } from "../app-injection-tokens";

@Injectable()
export class DashboardService {
  baseUrl = this.appApi + "/api/";

  constructor(private http: HttpClient, @Inject(APP_API_URL) private appApi) { }

  public allTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl + 'Dashboard/AllTours');
  }

}
