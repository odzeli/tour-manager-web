import { Observable } from "rxjs";
import { Tour } from "../../models/tour"
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base-service";

@Injectable()
export class DashboardService extends BaseService {

  dashboardApi = this.baseUrl + "/api/dashboard";

  constructor(private http: HttpClient) {
    super();
  }

  public allTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.dashboardApi + '/allTours');
  }

}
