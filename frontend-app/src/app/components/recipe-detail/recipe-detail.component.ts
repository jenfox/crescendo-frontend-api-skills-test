import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { Recipe, Direction } from 'src/app/services/recipe/recipe';
import { Observable, Subject, forkJoin, combineLatest, iif } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { SpecialService } from 'src/app/services/special/special.service';
import { ApiHost } from '../../config';
import { Special } from 'src/app/services/special/special';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  specials: Special[];
  apiHost = ApiHost;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _activatedRoute: ActivatedRoute,
    private _recipeService: RecipeService,
    private _specialService: SpecialService) { }

  ngOnInit(): void {
    // get recipes and specials from API
    combineLatest([this.getRecipe(), this.getSpecials()])
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe(
        ([recipe, specials]) => {
          this.recipe = recipe;
          this.specials = specials;

          // find ingredients with matching id in the specials list
          this.recipe.ingredients.forEach(
            ingredient => {
              ingredient.special = this.findSpecial(ingredient.uuid);
            }
          );
        }
      );
  }

  getRecipeUuid(): Observable<string> {
    return this._activatedRoute.queryParams.pipe(
      map(params => params.uuid)
    );
  }

  getRecipe(): Observable<Recipe> {
    return this.getRecipeUuid()
      .pipe(
        switchMap((recipeUuid: string) => this._recipeService.get(recipeUuid))
      );
  }

  getSpecials(): Observable<Special[]> {
    return this._specialService.getAll();
  }

  findSpecial(ingredientUuid: string): Special {
    return this.specials.find((special: Special) => {
      if (special.ingredientId === ingredientUuid) {
        return true;
      }
    });
  }

  isOptionalText(direction: Direction): string {
    return direction.optional ? '(Optional)' : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
