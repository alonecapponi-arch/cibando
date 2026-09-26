import { Component, Input } from '@angular/core';
// A) Input è un decoratore
import { Recipe } from 'src/app/models/recipe.model';
// B1) prima importo il modello 'Recipe'
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
// B2 obiettivo) creare una variabile chiamata 'recipe' tipizzata con il modello e decorata
@ Input() recipes: Recipe[];
}
