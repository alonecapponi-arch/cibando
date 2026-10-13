import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// A) Input è un decoratore
// B1) prima importo il modello 'Recipe'
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

recipes: Recipe[];
@Output() messaggio = new EventEmitter();


@ViewChild('modalCancellazione') modalCancellazione: ElementRef;
  id: string;
  title: string;
  cancella: string;

@Input() pag;
page = 1;
ricettePerPagina = 4;
totaleRicette: number;

ruolo: any;

constructor(
  private recipeService: RecipeService,
  private modalService: NgbModal,
  private router: Router,
  private userService: UserService
 ) {}

ngOnInit(): void {
  if (JSON.parse(localStorage.getItem('user')) !== null) {
    this.userService.userRole.subscribe({
      next: res => this.ruolo = res    //dopo il next si può anche scrivere (res) => {this.ruolo = res}
    })
  }


 this.recipeService.getRecipes().subscribe({
    next: (res) => {
    this.recipes = res;
    this.totaleRicette = res.length;
  },

  error: (err) => {
      console.log(err);
  }
 })
 this.recipeService.datiRicetta.subscribe(
     (del: any) =>{
      this.id = del;

      this.open(this.modalCancellazione)
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



 open(content: any, rimuovi?: string ) { // rimuovi è opzionale, se non viene passato il valore sarà undefined
    let cancella = rimuovi
    this.modalService.open(content, {ariaLabelledBy: 'modal cancellation', size: 'lg', centered: true}).result
    .then(
    (res) => {

      console.log('azione da eseguire', cancella) // qui puoi mettere un'azione da eseguire in base al risultato della modale
    }).catch((res) => {
      console.log('nessuna azione da eseguire')
    })

  }

onRemove(){
    console.log();

    const rec = this.id;
    // qui creo un oggetto user con i valori del form, che poi passo al servizio per inserirlo nel database



    this.recipeService.delRecipe(this.id).subscribe({
      next: (del) => {
        console.log(del);
        this.recipeService.datiRicetta.next(del);
        this.router.navigate(['recipe-card']);
      },
      error: (err) => {
        console.log(err);
      }
    })
}

}
// open(content: any, rimuovi: string) { // rimuovi è opzionale, se non viene passato il valore sarà undefined
//     let cancella = rimuovi;
//   this.modalService.open(content, {ariaLabelledBy: 'modal cancellation', size: 'lg', centered: true}).result
//     .then(
//     (res) => {
//       console.log('azione da eseguire', cancella) // qui puoi mettere un'azione da eseguire in base al risultato della modale
//     }).catch((res) => {
//       console.log('nessuna azione da eseguire')
//     })

//   }






