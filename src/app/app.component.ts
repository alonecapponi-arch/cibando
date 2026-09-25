import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cibando';


  constructor() {
    console.log('AppComponent constructor');
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit');
  }


}
