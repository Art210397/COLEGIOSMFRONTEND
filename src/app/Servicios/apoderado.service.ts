import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {

  constructor(private _http:HttpClient) { }

  getApoderados(): Observable<any>{
    var request = "apoderado";
    var url = environment.apiURL + request;
    return this._http.get(url);
  }

  getApoderado(id): Observable<any>{
    var request = "apoderado/" + id;
    var url = environment.apiURL + request
    return this._http.get(url);
  }

  createApoderado(newApoderado : any): Observable<any>{
    var request = "apoderado"
    var url = environment.apiURL + request;
    var header = new HttpHeaders();
    return this._http.post(url ,newApoderado ,{headers : header, responseType: 'text'})
  }

  updateApoderado(apoderado : any , id: number): Observable<any>{
    var request = "apoderado/" + id;
    var url = environment.apiURL + request;
    var header = new HttpHeaders();
    return this._http.put(url ,apoderado ,{headers : header, responseType: 'text'})
  }

  deleteApoderado(id : number): Observable<any>{
    var request = "apoderado/" + id;
    var url = environment.apiURL + request
    return this._http.delete(url);
  }

  descargarReporte() {
    var request = "apoderado/report";
    var url = environment.apiURL + request;
    return this._http.get<any>(url, {
      responseType: 'blob' as 'json'
    });
  }
}
