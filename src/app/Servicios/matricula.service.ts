import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private _http:HttpClient) { }

  getMatriculas(): Observable<any>{
    var request = "matricula";
    var url = environment.apiURL + request;
    return this._http.get(url);
  }

  getMatricula(id): Observable<any>{
    var request = "matricula/" + id;
    var url = environment.apiURL + request
    return this._http.get(url);
  }

  createMatricula(newMatricula : any): Observable<any>{
    var request = "matricula"
    var url = environment.apiURL + request;
    var header = new HttpHeaders();
    return this._http.post(url ,newMatricula ,{headers : header, responseType: 'text'})
  }

  updateMatricula(matricula : any , id: number): Observable<any>{
    var request = "matricula/" + id;
    var url = environment.apiURL + request;
    var header = new HttpHeaders();
    return this._http.put(url ,matricula ,{headers : header, responseType: 'text'})
  }

  deleteMatricula(id : number): Observable<any>{
    var request = "matricula/" + id;
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
