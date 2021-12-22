import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tour } from "../models/tour"
import { Observable } from "rxjs";

@Injectable()
export class TourService {
  baseUrl = "http://localhost:5000/";

  constructor(private http: HttpClient) { }

  public save(tour: Tour) {
    return this.http.post(this.baseUrl + 'api/Tour', tour);
  }
}
