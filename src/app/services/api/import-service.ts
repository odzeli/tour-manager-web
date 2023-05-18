import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ImportService extends BaseService {
  importApi = this.baseUrl + "/api/import";

  constructor(private http: HttpClient) {
    super();
  }

  public uploadFile(file) {
    return this.http.post(this.importApi + '/upload-and-import-tours', file, {
      reportProgress: true,
      observe: 'events'
    });

  }
}
