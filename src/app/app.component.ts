import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cibando';


  constructor(private userService: UserService) {
    console.log('AppComponent constructor');
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit');
    if(JSON.parse(localStorage.getItem('user')) !== null){ //se è presente un login:
    this.riceviRuolo();
    }
  }

  riceviRuolo() {
      this.userService.getUserProfile(JSON.parse(localStorage.getItem('user')).email).subscribe(
        res => {
               this.userService.userRole.next(res.role);
            // console.log('riceviRuolo '+ res['role']);
        }

      )
  }




}
