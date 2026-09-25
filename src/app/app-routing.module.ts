import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// modulo che si occupa di gestire il routing e andranno inseriti solo i link delle pagine che voglio che vengano caricate in base al percorso dell'url, in questo caso non ci sono pagine da caricare quindi lascio vuoto
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';

// constante che contiene le rotte dell'applicazione, in questo caso non ci sono rotte da caricare quindi lascio vuoto
const routes: Routes = [
// prima e ultima stringa fissa che indica la rotta di default che scriva www.cibando.it o www.cibando.it/home o qualcosa che non c'è nelle path
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //path: 'etichetta', component: NomeComponente che va aperto
  {path: 'home', component: HomeComponent},
  {path: 'ricette', component: RecipesComponent},
  {path:  '**', redirectTo: 'home', pathMatch: 'full'}
  // al posto di 'home' può esserci anche una pagina error 404
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
//inserisco scrollPositionRestoration: 'top' per far si che quando cambio pagina, la pagina venga caricata dall'inizio e non dalla posizione in cui mi trovavo
  exports: [RouterModule]
})
export class AppRoutingModule { }
