import { HttpClient } from "@angular/common/http";
import { Tour } from "../../models/tour"
import { Column } from "../../models/aboutColumn/column";
import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";
import { Observable } from "rxjs";
import { TourExpense } from "src/app/models/tour-expenses/tour-expense";
import { TourExpenseGroup } from "src/app/models/tour-expenses/tour-expense-group";

@Injectable()
export class TourService extends BaseService {

  tourApi = this.baseUrl + "/api/tour";

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public saveTour(tour: Tour, editMode: boolean): Observable<void> {
    return this.http.post<void>(this.tourApi + `/${tour.id}/editMode/${editMode}`, tour);
  }

  public tourMainInfo(tourId: string): Observable<Tour> {
    return this.http.get<Tour>(this.tourApi + `/${tourId}/tourMainInfo`);
  }

  public getColumns(tourId: string): Observable<Column[]> {
    return this.http.get<Column[]>(this.tourApi + `/${tourId}/getColumns`);
  }

  public initializeTourEditing(tourId: string): Observable<Tour> {
    return this.http.get<Tour>(this.tourApi + `/${tourId}/initialize-tour-editing`)
  }

  public deleteTour(tourId: string): Observable<void> {
    return this.http.delete<void>(this.tourApi + `/${tourId}/delete-tour`)
  }

  public tourExpenses(tourId: string): Observable<TourExpenseGroup[]>{
    return this.http.get<TourExpenseGroup[]>(`${this.tourApi}/${tourId}/tour-expenses`);
  }

  public saveTourExpenses(tourId: string, tourExpenses: TourExpense[]): Observable<void>{
    return this.http.post<void>(`${this.tourApi}/${tourId}/save-tour-expenses`, tourExpenses);
  }

}
