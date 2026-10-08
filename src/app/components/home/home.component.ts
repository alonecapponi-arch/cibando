import { HeaderComponent } from './../../shared/header/header.component';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// togliamo da qui import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  ricette: Recipe[];
  evidenziato = false;

  @ViewChild('modalRegistrazione') modalRegistrazione: ElementRef;
  nome: string;
  email: string;
  titolo: string;

constructor(private userService: UserService, private modalService: NgbModal) { }
// togliamo da qui private recipeService: RecipeService,

ngOnInit(): void {
  // this.prendiRicette()

  this.userService.datiUtente.subscribe(
    (res: any) =>{
      this.nome = res.nome;
      this.email = res.email;

      this.open(this.modalRegistrazione)
    }
  )


}

onEvidenziato(){
    this.evidenziato = !this.evidenziato;
  }

open(content: any, titoletto?: string) { // titoletto è opzionale, se non viene passato il valore sarà undefined
    let titolo = titoletto;
  this.modalService.open(content, {ariaLabelledBy: 'modal registration', size: 'lg', centered: true}).result
    .then(
    (res) => {
      console.log('azione da eseguire, ecco il titolo arrivato: ', titolo) // qui puoi mettere un'azione da eseguire in base al risultato della modale
    }).catch((res) => {
      console.log('nessuna azione da eseguire')
    })

  }
}
// uno script neutro che mi apre una finestra modale e poi la modale può avere 2 azioni in base al risultato



// prendiRicette(){
//     this.recipeService.getRecipes().subscribe({
//       next: (res) => {
//         this.ricette = res;
//         this.ricette = this.ricette.sort((a,b) => b._id - a._id).slice(0,4);
//         },
//       error: (err) => {
//         console.log(err);
//         }

//       })
//     }
// non + utilizzato perchè abbiamo attivato il server



