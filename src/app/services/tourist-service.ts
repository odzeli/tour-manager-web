import { Injectable } from "@angular/core";
import { Tourist } from "../models/tourist";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TouristService {

  baseUrl = "http://localhost:5000/";

  constructor(private http: HttpClient){

  }

  getTourist() {
    const date = new Date();

    return this.http.get<Tourist>(this.baseUrl + "api/Tourist/" + "28678018-C358-4D6D-5BFB-08D985DA033E");
  }

  setTourist(tourist: Tourist){
    return this.http.post(this.baseUrl + 'api/Tourist', tourist);
  }

}
