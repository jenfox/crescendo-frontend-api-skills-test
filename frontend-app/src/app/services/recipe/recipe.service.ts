import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { ApiHost } from './../config';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _http: HttpClient) { }

  get(uuid: string): Observable<Recipe> {
    return this._http.get<Recipe>(ApiHost + '/recipes' + '/' + uuid);
  }

  getAll(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(ApiHost + '/recipes');
  }

  add(recipe: Recipe): void {
    this._http.post(ApiHost + '/recipes', recipe).subscribe();
  }

  update(recipe: Recipe): void {
    this._http.put(ApiHost + '/recipes' + '/' + recipe.uuid, recipe).subscribe();
  }

}