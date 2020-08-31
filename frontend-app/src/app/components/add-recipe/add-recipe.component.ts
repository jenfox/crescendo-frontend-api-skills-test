import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { Recipe, Direction, Ingredient } from 'src/app/services/recipe/recipe';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.sass']
})
export class AddRecipeComponent {

  recipe = new Recipe();
  ingredients: string;
  directions: string;
  saved = false;

  constructor(private _recipeService: RecipeService) { }

  saveRecipe(): void {
    this.recipe.uuid = uuidv4();
    this.recipe.ingredients = this.parseIngredients();
    this.recipe.directions = this.parseDirections();
    this.recipe.images = {
      small: '',
      medium: '',
      full: '',
    };
    this.recipe.postDate = new Date();
    this.recipe.editDate = new Date();

    this._recipeService.post(this.recipe);

    this.saved = true;
  }
  
  private parseIngredients(): Ingredient[] {
    const ingredients: Ingredient[] = [];
    this.ingredients.split('\n').forEach(line => {
      const details = line.split(' ');
      ingredients.push({
        uuid: uuidv4(),
        amount: Number.parseFloat(details[0]),
        measurement: details[1],
        name: details[2],
      });
    });
    return ingredients;
  }

  private parseDirections(): Direction[] {
    const directions: Direction[] = [];
    this.directions.split('\n').forEach(line => {
      let optional = false;
      if (line.search(/optional/i) !== -1) {
        line.replace(/optional/i, '');
        optional = true;
      }
      directions.push({
        instructions: line,
        optional,
      });
    });
    return directions;
  }

}
