import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { take, first, Observable, map } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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

totRecipe: Recipe[];

// CREO UNA VARIABILE PER LA PIPE ASYNC $ convenzione in angular per far capire che sarà chiamata tremite pipe async
recipes$: Observable<Recipe[]> = this.recipeService.getRecipesAsync().pipe(
  map(res => res.filter(ricettaFiltrata => ricettaFiltrata.difficulty < 5)), // (scritta opzionale per filtrare) cerco elenco prodotti e poi filtro tramite una condizione
  map (res => this.totRecipe= res) // tutti prodotti filtrati e inseriti nella Response
);
//tutto questo puà essere ridotto fino a:  recipes$: Observable<Recipe[]> = this.recipeService.getRecipesAsync().pipe();
// ma si aggiunge i map per filtrare o avere una variabile da utilizzare magari per le pagine




constructor(
  private recipeService: RecipeService,
  private modalService: NgbModal,
  private router: Router,
  private userService: UserService,
  private sanitizer: DomSanitizer
 ) {}

ngOnInit(): void {
  if (JSON.parse(localStorage.getItem('user')) !== null) {
    this.userService.userRole.subscribe({
      next: res => this.ruolo = res    //dopo il next si può anche scrivere (res) => {this.ruolo = res}
    })
  }


 this.recipeService.getRecipes().pipe(
  map(res => res.filter(ricettaFiltrata => ricettaFiltrata.difficulty < 5)),//
  map (res => this.totRecipe = res),
    first()
   ).subscribe({
    next: (res) => {
    this.recipes = res;
    this.totaleRicette = res.length;
  },

  error: (err) => {
      console.log(err);
  }
 })
//  this.recipeService.datiRicetta.subscribe(
//      (del: any) =>{
//       this.id = del;

//       this.open(this.modalCancellazione)
//     })
}

// Sanitizzazione del contenuto HTML
  getSanitizedHTML(descrizione: string): SafeHtml { //
    const tagliaDescrizione = this.accorciaDescrizioneNuova(descrizione); // la costante richiama il metodo sotto e gli passa la descrizione accorciata (prima di sanificare)
    const sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(tagliaDescrizione); // bypa.. è un metodo per sanificare
    return sanitizedDescription;
  }

// Funzione per accorciare la descrizione
 accorciaDescrizioneNuova(descrizione: string): string {
    const lunghezzaMassima = 198;
    if (descrizione.length <= lunghezzaMassima) {
      return descrizione.slice(0, lunghezzaMassima);
    } else {
      const ultimaPosizioneSpazio = descrizione.lastIndexOf(' ', lunghezzaMassima); // prendere l'ultimo spazio ' ' prima del 198
      return descrizione.slice(0, ultimaPosizioneSpazio);
    }
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


 open(content: any, idDelete: string ) { // rimuovi è opzionale, se non viene passato il valore sarà undefined
   this.modalService.open(content, {ariaLabelledBy: 'modal cancellation', size: 'lg', centered: true}).result
    .then(
    (res) => {
      if (idDelete) {
        this.onRemove(idDelete);
      }
      console.log('azione da eseguire', idDelete) // qui puoi mettere un'azione da eseguire in base al risultato della modale
    })
    .catch((error) => {

      console.log('nessuna azione da eseguire', error)
    });

  }
private onRemove(id: string) {
    this.recipeService.delRecipe(id).subscribe({
      next: (res) => {
        console.log('ricetta eliminata con successo', res);
        this.recipeService.datiRicetta.next(res);
        this.router.navigate(['recipe-card']);
      },
      error: (err) => {
        console.log('Errore cancellazione', err);
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






