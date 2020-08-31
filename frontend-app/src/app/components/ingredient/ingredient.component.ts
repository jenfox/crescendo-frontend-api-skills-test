import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/services/recipe/recipe';
import { Special } from 'src/app/services/special/special';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.sass']
})
export class IngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;
  
  special: Special;

  readonly googleMapsUrl = 'http://www.google.com/maps/place/';

  constructor() { }

  ngOnInit(): void {
    this.special = this.ingredient.special;
  }

  getLatitude(geoCoords: string): string {
    return geoCoords.split(',')[0];
  }

  getLongitude(geoCoords: string): string {
    return geoCoords.split(',')[1];
  }

  makeGoogleMapUrl(geoCoords: string): string {
    const lat = this.getLatitude(geoCoords);
    const lng = this.getLongitude(geoCoords);

    return this.googleMapsUrl + lat + '/' + lng;
  }

}
