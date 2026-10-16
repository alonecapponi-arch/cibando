import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { DetailComponent } from './detail/detail.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { LoggedInGuard } from '../../logged-in.guard';

const routes: Routes = [
  {path: '', component: RecipesComponent, children: [
    {path: 'recipes', component: RecipeListComponent, pathMatch: 'full'},
    {path: 'dettaglio/:title/:_id' , component: DetailComponent},
    {path: 'new-recipe', component: NewRecipeComponent, canActivate: [LoggedInGuard] },
    { path: '', pathMatch: 'full', component: RecipeListComponent}
    ]},
  ];

  @NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]


  })

  export class RecipeRoutingModule { }
