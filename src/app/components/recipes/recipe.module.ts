import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { RecipeRoutingModule } from './recipes-routing.module';

import { RecipesComponent } from './recipes.component';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';
import { DetailComponent } from './detail/detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeCardComponent,
    DetailComponent,
    RecipeListComponent,
    NewRecipeComponent
    ],

  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    HttpClientModule,
    ToastModule,
    RecipeRoutingModule
  ],
  exports:[RecipeCardComponent]//componenti che vanno esportati
  })

  export class RecipesModule { }

