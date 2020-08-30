import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Special } from './special';
import { ApiHost } from './../config';

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Special[]> {
    return this._http.get<Special[]>(ApiHost + '/specials');
  }
}