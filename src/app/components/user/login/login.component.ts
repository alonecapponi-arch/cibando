import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  })
export class LoginComponent {

  loginError = ''; //stringa vuota
  user: any; //A è un plus di educazione

  constructor(private router: Router, private auth:AuthService){}

onSubmit(credentials: any){ //dovrà ricevere parametri in ingresso credentials: any o scrivere {email:email, password:password}
  if(credentials.email !== '' && credentials.password !== ''){ //se entrambi sono compilati
    this.auth.login(credentials.email, credentials.password).subscribe({
      next: (res) => {        //se mi restituisce una response con entrambi i dati
          this.user = res;  //A è un plus di educazione

          if(res) {  // salvare i dati in una storage
              this.auth.saveStorage(res);
              this.router.navigate(['/home']);   //fatto tutto torna alla home
          }
      },
      error: (error) => {
        console.log(error);
        this.loginError = 'attenzione email o password errati';
      }
    })
}
}

}
