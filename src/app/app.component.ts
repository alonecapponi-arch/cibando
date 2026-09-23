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
];

percorsoFoto = '../assets/images/imageBg-';



coloreScelto = 'green';

colore = 'gray';

onChangeColore(){
  this.colore = this.coloreScelto;
}

}
