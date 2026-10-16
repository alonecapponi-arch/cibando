import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// modulo che si occupa di gestire il routing e andranno inseriti solo i link delle pagine che voglio che vengano caricate in base al percorso dell'url, in questo caso non ci sono pagine da caricare quindi lascio vuoto
import { HomeComponent } from './components/home/home.component';

import { RegistrationComponent } from './components/user/registration/registration.component';
// import { RecipeCardComponent } from './shared/recipe-card/recipe-card.component';
// import { NewRecipeComponent } from './components/recipes/new-recipe/new-recipe.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoggedInGuard } from './logged-in.guard';



// constante che contiene le rotte dell'applicazione, in questo caso non ci sono rotte da caricare quindi lascio vuoto
const routes: Routes = [
// prima e ultima stringa fissa che indica la rotta di default che scriva www.cibando.it o www.cibando.it/home o qualcosa che non c'è nelle path
  {path: '', component: HomeComponent, pathMatch: 'full'},
  //path: 'etichetta', component: NomeComponente che va aperto
  {path: 'home', component: HomeComponent},
  // {path: '', component: RecipesComponent, children: [
  //     {path: 'recipes', component: RecipeListComponent, pathMatch: 'full'},
  //     {path: 'dettaglio/:title/:_id' , component: DetailComponent},
  //     {path: 'new-recipe', component: NewRecipeComponent, canActivate: [LoggedInGuard] }],
  {path: 'registrazione', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  // :title/ per aver una url friendly
  // ricette usa children per indicare che ha pagine che derivano da lei
  // /: è il codice di angular che stiamo passando un parametro _id
  {path:  '**', redirectTo: 'home'},
  // al posto di 'home' può esserci anche una pagina error 404
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
//inserisco scrollPositionRestoration: 'top' per far si che quando cambio pagina, la pagina venga caricata dall'inizio e non dalla posizione in cui mi trovavo
  exports: [RouterModule]
})
export class AppRoutingModule { }
