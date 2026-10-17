import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl = '/api/users'; // qui inseriamo l'url base dell'api, in questo caso è /api/users

  datiUtente = new ReplaySubject();
  userRole = new ReplaySubject();

  constructor(
    private http: HttpClient
  ) { }

  insertUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/signup`, user); //versione con il backtick, che ci permette di inserire variabili all'interno della stringa
  }

  getUserProfile(email: string): Observable<any>{
    const user = {email: email}
    //nel caso che fosse stato (email: string, password:string) avrei creato una costante oggetto:
    //const user = {
    //  email: email
    //  password: password}
    // e scritto alla fine user invece di email
    return this.http.post<any>(`${this.apiBaseUrl}/user`, user)
  }
}
