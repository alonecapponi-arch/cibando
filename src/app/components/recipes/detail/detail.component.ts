import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  ricetta: Recipe;
  percorsoDifficolta = '../../../../assets/images/difficolta-'


  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
ngOnInit(): void {
  this.onGetRecipe();
}
// PRIMO METODO TRAMITE SNAPSHOT + bella perchè + completa
onGetRecipe(): void{
  const id = Number(this.activatedRoute.snapshot.paramMap.get('_id'));

 this.recipeService.getRecipe(id).subscribe({
    next: (res) => {
      this.ricetta = res;
//     console.log('ecco la ricetta ' + res.title);
   },
   error: (err) => {
      console.log(err);
    }
  })
}
// SECONDO METODO TRAMITE PARAMS versione super stringata ma in caso di errore lo perdi
// PREFERITO PER + PARAMETRI aggiungendo e variando const id= urlParams['_id'];
// onGetRecipe2(): void{
//  this.activatedRoute.params.subscribe((urlParams) => {
//      const id= urlParams['_id'];
//      const idNumerico = Number(id);
//
//      this.recipeService.getRecipe(idNumerico).subscribe(res => this.ricetta = res);
//  })
//
//}
}

// 4 inseriamo ActivatedRoute serve ad analizzare la rotta attiva
// 4 Router lo utilizzo ogni volta che voglio collegarmi con una pagina direttamente
// 4 dalla classe, senza passare tramite routeLink, quindi un metodo che decide l'attivazione
// 4 della pagina

// 12 come per il costruttore in recipes.component

// 14 variabile che vuole una RESPONSE oggetto,
// 14 se invece volevo una RESPONSE come in ricipes: ricette: Recipe[]

//  26 .snapshot (istantanea) get (prendere) _id PREFERITO SE ABBIAMO UN SOLO PARAMETRO DA RECUPERARE
//  26 che arriva come paraMap (parametro) dalla activateRoute (route attiva)
//  26 la const id esce come una string ma noi la vogliano numero e la rendiamo tale
//  26 tramite la funzione Number di JS

// 31 posso scrivere this.ricetta.title o anche res.title

// 41 urlParams è una variabile di mia invenzione

// TUTTO QUESTO
//  this.recipeService.getRecipe(id).subscribe({
//    next: (res) => {
//      this.ricetta = res;
//      console.log('ecco la ricetta ' + res.title);
//    },
//    error: (err) => {
//      console.log(err);
//    }
//  })
// è UGUALE a
//  this.recipeService.getRecipe(idNumerico).subscribe(res => this.ricetta = res);
