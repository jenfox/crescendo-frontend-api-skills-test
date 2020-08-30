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

  getAll(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(ApiHost + '/recipes');
  }
}