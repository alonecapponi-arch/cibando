import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {  //tutti comandi creati in automatico nella creazione Guadia
       const isLogged = this.authService.isLogged();                                                               //ps oggi non compare nulla del genere e abbiamo CanActivateFn
       if(!isLogged){ //se non è loggato deve tornare in home
          this.router.navigateByUrl('home');
          // this.router.navigate(['home']); si può scrivere anche così
       }
      return isLogged; //il return sarà dinamico in base allo stato di log
    }


}
