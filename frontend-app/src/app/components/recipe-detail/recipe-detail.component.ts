import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import { Recipe, Direction } from 'src/app/services/recipe/recipe';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { ApiHost } from './../../services/config';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  apiHost = ApiHost;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _activatedRoute: ActivatedRoute,
    private _recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipeUuid()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((recipeUuid: string) => this._recipeService.get(recipeUuid))
      ).subscribe(
        (recipe: Recipe) => {
          this.recipe = recipe;
        }
      );

  }

  getRecipeUuid(): Observable<string> {
    return this._activatedRoute.queryParams.pipe(
      map(params => params['uuid'])
    )
  }

  isOptionalText(direction: Direction): string {
    return direction.optional ? '(Optional)' : '';
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

}
