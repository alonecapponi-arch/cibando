
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  data: any;

  constructor(private userService:UserService) {}

ngOnInit(): void {
  this.riceviDati();
}

riceviDati() {
  if(JSON.parse(localStorage.getItem('user')) !== null) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  if(this.user) {
    this.userService.getUserProfile(this.user.email).subscribe(
      res => {
        this.user = res
        this.data = moment(this.user.createdAt).locale('it').format('dddd DD MMMM YYYY')
      }
    )
  }

 }
//SCRIVIBILE ANCHE COSI'
// riceviDati2() {
//   if(JSON.parse(localStorage.getItem('user')) !== null) {
//      this.userService.getUserProfile(JSON.parse(localStorage.getItem('user')).email).subscribe(
//       res => this.user = res
//     )
//   }
//  }
 // O COSI'
// riceviDati3() {
//   if(JSON.parse(localStorage.getItem('user')) !== null) {
//     let email = JSON.parse(localStorage.getItem('user')).email;
//      this.userService.getUserProfile(email).subscribe(
//       res => this.user = res
//     )
//   }
//  }




}
