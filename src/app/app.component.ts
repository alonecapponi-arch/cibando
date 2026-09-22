import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cibando';

images = [
  {id: 1, label: 'Spaghetti al sugo'},
  {id: 2, label: 'tagliata di manzo'},
  {id: 3, label: 'Tiramisu'},
]

  percorsoFoto = "../assets/images/imageBg-";


allievi = [
 {nome: 'alone', citta: 'roma'},
  {nome: 'itria', citta: 'roma'},
  {nome: 'mary', citta: 'napoli'},
  {nome: 'alone', citta: 'milano'},
];

}

