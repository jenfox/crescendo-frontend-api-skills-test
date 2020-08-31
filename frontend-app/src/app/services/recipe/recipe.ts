import { Special } from '../special/special';

export class Ingredient {
    uuid: string;
    amount: number;
    measurement: string;
    name: string;
    special?: Special;
}

export class Direction {
    instructions: string;
    optional: boolean;
}
export class Recipe {
    uuid: string;
    title: string;
    description: string;
    images: {
        full: string;
        medium: string;
        small: string;
    };
    servings: number;
    prepTime: number;
    cookTime: number;
    postDate: Date;
    editDate: Date;
    ingredients: Ingredient[];
    directions: Direction[];
}
