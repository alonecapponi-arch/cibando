import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck{

  user: any;

  constructor(public auth: AuthService, private router:Router) {}

  ngDoCheck(): void {  // onInit esegue il controllo solo all'avvio della pagina, ngDoCheck invece è sempre in ascolto
    if(JSON.parse(localStorage.getItem('user')) !== null){ // se (JSON.parse(localStorage.getItem('user')) è diverso da null cioè se cambia
      this.user = JSON.parse(localStorage.getItem('user')); // allora esegui questa cosa
    } // nel momento del login si salvano i dati in localStorage e quindi si va a valorizzare this.user (che mi torna così:user = {
                                                                                                                            //     name: res.name,
                                                                                                                            //     email: res.email,
                                                                                                                            //     Password: res.password.
                                                                                                                            //   }
}
logout(){
  this.auth.logout();
this.router.navigate(['/home']);
}
     //metodo che andrà a richiamare quello inserito nel auth.service


}
