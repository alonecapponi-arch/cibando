import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent {

form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    difficulty: new FormControl<number | null>(null, Validators.required),
},
);



 constructor(private recipeService: RecipeService, private router: Router) { }

onSubmit(){
    console.log(this.form.value);

    const recipe = {title: this.form.value.title, description: this.form.value.description, image: this.form.value.image, difficulty: this.form.value.difficulty};
    // qui creo un oggetto user con i valori del form, che poi passo al servizio per inserirlo nel database


    const ricetta = this.form.value;

    this.recipeService.insertRecipe(ricetta).subscribe({
      next: (res) => {
        console.log(res);

        this.recipeService.datiRicetta.next(ricetta);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
      }
    })


  }



}


