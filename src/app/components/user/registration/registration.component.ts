import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './customValidator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/)]),
    ripetiPassword: new FormControl('', Validators.required),
    accetto: new FormControl(false, Validators.requiredTrue),
  },
  [CustomValidators.MatchValidator('password', 'ripetiPassword')],
);

constructor(private userService: UserService, private router: Router) { }

  onSubmit(){
    console.log(this.form.value);

    const user = {nome: this.form.value.name, email: this.form.value.email};

    this.userService.datiUtente.next(user);

    this.router.navigate(['home']);
  }

   convalidaPassword(): boolean{
    let password = this.form.controls.password.value;
    let ripetiPassword = this.form.controls.ripetiPassword.value;

    if(password === ripetiPassword){
      return true;
    } else {
     return false;
    }
  }
}
