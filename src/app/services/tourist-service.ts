import { Inject, Injectable } from "@angular/core";
import { Tourist } from "../models/tourist";
import { HttpClient } from "@angular/common/http";
import { APP_API_URL } from "../app-injection-tokens";

@Injectable()
export class TouristService {

  baseUrl = this.appApi + "/api/";

  constructor(private http: HttpClient, @Inject(APP_API_URL) private appApi){

  }

  getTourist() {
    const date = new Date();

    return this.http.get<Tourist>(this.baseUrl + "Tourist/" + "28678018-C358-4D6D-5BFB-08D985DA033E");
  }

  setTourist(tourist: Tourist){
    return this.http.post(this.baseUrl + 'Tourist', tourist);
  }

  touristsList(tourId: string) {
    return this.http.get<Tourist[]>(this.baseUrl + 'Tourist/TouristsList/' + tourId);
  }

  change(tourist: Tourist) {
    return this.http.post(this.baseUrl + 'Tourist/ChangeTourist', tourist);
  }
}
