import { Component, OnInit, ElementRef} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{
ricette: Recipe[];
titoloRicevuto: string;
difficoltaRicevuta: number;




constructor(private recipeService: RecipeService, private modalService: NgbModal, private router: Router) { }

ngOnInit(): void {
 this.recipeService.getRecipes().subscribe({
    next: (res) => {
    this.ricette = res;
  },

  error: (err) => {
      console.log(err);
  }

 })

}

riceviMessaggio(e: any){
  this.titoloRicevuto == e.titolo ? this.titoloRicevuto = '' : this.titoloRicevuto = e.titolo;
  this.difficoltaRicevuta = e.diff
}
// o OPERATORE TERNARIO
//this.titoloRicevuto == e ? this.titoloRicevuto = '' : this.titoloRicevuto = e;
}
// 1 inseriamo nel Componet OnInit come prima cosa
// 1 implementiamo OnInit per poter utilizzare il metodo ngOnInit che viene eseguito quando
// 1 il componente viene inizializzato

// 14 creo una variabile di tipo Recipe[] per contenere le ricette
// 14 'ricette' è la variabile del componente padre che andremo ad inserire nel
// 14 componente padre (recipes.component.html)

// 19 il next viene eseguito quando l'observable emette un valore,
// 19 in questo caso l'array di ricette a buon fine

// 25 l'error viene eseguito quando l'observable emette un errore,
// 25  in questo caso un errore di rete o di server
// 25 stampo l'errore in console che restituisce il server



