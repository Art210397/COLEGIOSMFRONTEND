import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }

  getAdmins(): Observable<any>{
    var request = "admin";
    var url = environment.apiURL + request;
    return this._http.get(url)
  }

  getAdmin(id){
    var request = "admin" + id;
    var url = environment.apiURL + request
    return this._http.get(url);
  }

  createAdmin(newAdmin: any){
    var request = "admin"
    var url = environment.apiURL + request;
    let objetoJson = JSON.stringify(newAdmin);
    var header = new HttpHeaders().set("content-type", "application/json");
    return this._http.post(url, objetoJson, {headers : header})
  }

  updateAdmin(AdminActualiced: any){
    var request = "admin"
    var url = environment.apiURL + request;
    let objetoJson = JSON.stringify(AdminActualiced);
    var header = new HttpHeaders().set("content-type", "application/json");
    return this._http.put(url, objetoJson, {headers : header})
  }

  deleteAdmin(id : number): Observable<any>{
    var request = "admin"
    var url = environment.apiURL + request
    return this._http.delete(url);

  }
}
