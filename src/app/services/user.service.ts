import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl = '/api/users'; // qui inseriamo l'url base dell'api, in questo caso è /api/users

  datiUtente = new ReplaySubject();

  constructor(
    private http: HttpClient
  ) { }

  insertUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/signup`, user); //versione con il backtick, che ci permette di inserire variabili all'interno della stringa
  }
}
