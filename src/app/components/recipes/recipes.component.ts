// inseriamo nel Componet OnInit come prima cosa
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
// implementiamo OnInit per poter utilizzare il metodo ngOnInit che viene eseguito quando il componente viene inizializzato
export class RecipesComponent implements OnInit {
// creo una variabile di tipo Recipe[] per contenere le ricette
ricette: Recipe[];
// 'ricette' è la variabile del componente padre che andremo ad inserire nel componente padre (recipes.component.html)
constructor(private recipeService: RecipeService) { }

ngOnInit(): void {
 this.recipeService.getRecipes().subscribe({
  //il next viene eseguito quando l'observable emette un valore, in questo caso l'array di ricette a buon fine
  next: (res) => {
    this.ricette = res;
  },
  //l'error viene eseguito quando l'observable emette un errore, in questo caso un errore di rete o di server
  error: (err) => {
  //stampo l'errore in console che restituisce il server
    console.log(err);
  }

 })
}
}
