// qui inseriamo tutti i metodi che interessano le ricette
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../mocks/recipe.mock';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  apiBaseUrl = '/api/recipes'; // qui inseriamo l'url base dell'api, in questo caso è /api/recipes

  constructor(private http: HttpClient) { }


getRecipes(): Observable<Recipe[]> {
  //  return of(RECIPES);
  // return this.http.get<Recipe[]>(this.apiBaseUrl + '/');

  return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`);
}
  //versione con il backtick, che ci permette di inserire variabili all'interno della stringa
  // qui facciamo la chiamata http al nostro endpoint /api/recipes, che ci restituisce un array di ricette
  // il metodo getRecipes() restituisce un Observable di tipo Recipe[], che è un array di ricette
  // il metodo get() di HttpClient restituisce un Observable di tipo any, quindi dobbiamo specificare il tipo di ritorno con <Recipe[]>


// per il componente dettaglio andremo a creare un metodo che estrae una sola ricetta, un discorso di filtraggio
// inserendo id: number dico al metodo che quando viene invocato gli passo id del prodotto
// dovrà ricevere per essere richiamato l'id. Gli diciamo che è asincrono (Observable)
// inserendo | (pipe) gli dico che può darmi 2 risultati o ricetta o altro (posso inserire una doppia tipizzazione )


//  getRecipe(id: number): Observable<Recipe | undefined> {
//   const recipe  = RECIPES.find(ricetta => ricetta._id === id);
//  return of (recipe);
// la costante recipe mi cerca all'interno della Response in questo caso mock (RECIPES(array di oggetti))
// tramite . find la ricetta relatica a specifico ._id
// tramite arrow function (=>) e comparazione (===)

getRecipe(id: string): Observable<Recipe> {
  return this.http.get<Recipe>(`${this.apiBaseUrl}/${id}`); //versione con il backtick, che ci permette di inserire variabili all'interno della stringa
  // qui facciamo la chiamata http al nostro endpoint /api/recipes/:id, che ci restituisce una sola ricetta
  // il metodo getRecipe() restituisce un Observable di tipo Recipe, che è una sola ricetta
  // il metodo get() di HttpClient restituisce un Observable di tipo any, quindi dobbiamo specificare il tipo di ritorno con <Recipe>
  // inserendo ${id} gli dico che voglio passare l'id della ricetta come parametro nell'url
  // in questo caso l'url sarà /api/recipes/:id, dove :id è l'id della ricetta che voglio ottenere
  // in questo caso l'url sarà /api/recipes/1, dove 1 è l'id della ricetta che voglio ottenere
  // inseriamo "of (recipe)" perchè è sotto mock, nel momento che la liberiamo
  // diventa return recipe;
}

}
