// qui inseriamo tutti i metodi che interessano le ricette
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../mocks/recipe.mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }


getRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }
// per il componente dettaglio andremo a creare un metodo che estrae una sola ricetta, un discorso di filtraggio
// inserendo id: number dico al metodo che quando viene invocato gli passo id del prodotto
// dovrà ricevere per essere richiamato l'id. Gli diciamo che è asincrono (Observable)
// inserendo | (pipe) gli dico che può darmi 2 risultati o ricetta o altro (posso inserire una doppia tipizzazione )
getRecipe(id: number): Observable<Recipe | undefined> {
  const recipe  = RECIPES.find(ricetta => ricetta._id === id);
// la costante recipe mi cerca all'interno della Response in questo caso mock (RECIPES(array di oggetti))
// tramite . find la ricetta relatica a specifico ._id
// tramite arrow function (=>) e comparazione (===)

  return of (recipe);
  // inseriamo "of (recipe)" perchè è sotto mock, nel momento che la liberiamo
  // diventa return ricipe;
}

}
