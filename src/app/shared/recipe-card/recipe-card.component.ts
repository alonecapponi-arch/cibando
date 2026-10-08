import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
// A) Input è un decoratore
import { Recipe } from 'src/app/models/recipe.model';
// B1) prima importo il modello 'Recipe'
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
recipes: Recipe[];
@Output() messaggio = new EventEmitter();

@Input() pag;
page = 1;
ricettePerPagina = 4;
totaleRicette: number;

constructor(private recipeService: RecipeService) { }

ngOnInit(): void {
 this.recipeService.getRecipes().subscribe({
    next: (res) => {
    this.recipes = res;
    this.totaleRicette = res.length;
  },

  error: (err) => {
      console.log(err);
  }

 })
}

inviaTitolo(titolo: string, diff: number)  {

  const valoriDaInviare = {
    titolo: titolo,
    diff: diff,
  }
  this.messaggio.emit(valoriDaInviare);
}

accorciaDescrizione(descrizione):number{
  const lunghezzaMassima =195;
    if(descrizione.length <= lunghezzaMassima){
      return lunghezzaMassima;
    } else {
      let ultimaPosizioneSpazio = descrizione.indexOf(' ', lunghezzaMassima);
      return ultimaPosizioneSpazio;
    }
}

paginate(event) {
  event.page = event.page + 1;
  this.page = event.page;
 }
}
// B2 obiettivo) creare una variabile chiamata 'recipe' tipizzata con il modello e decorata
