import { Component, OnInit } from '@angular/core';
import { RecipeService } from './../../services/recipe/recipe.service';
import { Recipe } from 'src/app/services/recipe/recipe';
import { ApiHost }  from  './../../services/config';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  apiHost = ApiHost;

  constructor(private _recipeService: RecipeService) { }

  ngOnInit(): void {
    this._recipeService.getAll().subscribe(
      recipes => {
        this.recipes = recipes;
      }
    )
  }

}
