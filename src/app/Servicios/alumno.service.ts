import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private _http: HttpClient) { }

  getAlumnos(): Observable<any> {
    var request = "alumno";
    var url = environment.apiURL + request;
    return this._http.get(url);
  }

  getAlumno(id): Observable<any> {
    var request = "alumno/" + id;
    var url = environment.apiURL + request
    return this._http.get(url);
  }

  createAlumno(newAlumno: any): Observable<any> {
    var request = "alumno"
    var url = environment.apiURL + request;
    var header = new HttpHeaders();
    return this._http.post(url, newAlumno, { headers: header, responseType: 'text' })
  }

  updateAlumno(alumno: any, id: number): Observable<any> {
    var request = "alumno/" + id;
    var url = environment.apiURL + request;
    var header = new HttpHeaders();
    return this._http.put(url, alumno, { headers: header, responseType: 'text' })
  }

  deleteAlumno(id: number): Observable<any> {
    var request = "alumno/" + id;
    var url = environment.apiURL + request
    return this._http.delete(url);
  }

  descargarReporte() {
    var request = "alumno/report";
    var url = environment.apiURL + request;
    return this._http.get<any>(url, {
      responseType: 'blob' as 'json'
    });
  }

  getapoderado(){
    var request = "apoderado";
    var url = environment.apiURL + request;
    return this._http.get(url)
  }
}
