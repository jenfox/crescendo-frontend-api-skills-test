import { Component, OnInit } from '@angular/core';
import { RecipeService } from './../../services/recipe/recipe.service';
import { Recipe } from 'src/app/services/recipe/recipe';
import { ApiHost } from '../../config';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  // expose ApiHost value to template
  apiHost = ApiHost;

  constructor(private _recipeService: RecipeService) { }

  ngOnInit(): void {
    // init recipe list
    this._recipeService.getAll().subscribe(
      recipes => {
        this.recipes = recipes;
      }
    );
  }

}
