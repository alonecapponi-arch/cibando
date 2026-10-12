import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl = '/api/users';

  constructor(private http:HttpClient, private userService:UserService) { }

  login(email:string, password: string): Observable<any> {
    const user = {email: email, password:password};

    return this.http.post<any>(`${this.apiBaseUrl}/login`, user); //sto dicendo: usa questa `${this.apiBaseUrl}/login` e portati l'oggetto user
  }

  saveStorage(res: any) {
    const user = {
      name: res.name,
      email: res.email,
      password: res.password,
    }
    this.userService.userRole.next(res.role);            // 2 azioni in caso di login
    localStorage.setItem('user', JSON.stringify(user));  //prendere JSON e trasformarla in una stringa (.stringify(user))

  }

isLogged(): boolean {       //metodo di controllo tramite if per verificare se utente e collegato o no
  return JSON.parse(localStorage.getItem('user')) !== null; //se localStorage.getItem('user') è diverso da null, riprendi il valore user archiviato in localStorage
}                                                              //JSON.parse (trasformare in una stringa il dato archiviato il localStorage)

logout(): void {
  localStorage.removeItem('user');
  this.userService.userRole.next('');     // con il logout rimuovo l'user e svuoto il ruolo
}
}





//localStorage -->si crea quando si fa un Login, e conserva i dati anche dopo chiusura (tranne per il logout o cancellazione tutta cache) e sono sempre string
//sessionStorage -->si crea quando si fa un Login (inizializzato una sessione), il sistema archivia i dati da poter utillizare durante la navigazione
                    // si differenzia da local dal fatto non conserva i dati login dopo la chiusura (logout, chiusura browser, spegni pc).
//cookies, variabile dei local e possono essere tolti tramite pulizia cache o se hanno un timer di durata
