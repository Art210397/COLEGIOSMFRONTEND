import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private _http: HttpClient) { }

  getLogs(){
    var request = "logs";
    var url = environment.apiURL + request;
    return this._http.get(url);
  }

  getLog(id): Observable<any> {
    var request = "logs/" + id;
    var url = environment.apiURL + request
    return this._http.get(url);
  }

  deleteLogs(id: number): Observable<any>{
    var request = "logs/" + id;
    var url = environment.apiURL + request
    return this._http.delete(url);
  }

  descargarReporte() {
    var request = "logs/report";
    var url = environment.apiURL + request;
    return this._http.get<any>(url, {
      responseType: 'blob' as 'json'
    });
  }
}
