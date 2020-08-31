enum SpecialType {
    event, local, promocode, sale
}

export class Special {
    uuid: string;
    ingredientId: string;
    type: SpecialType;
    title: string;
    geo?: string;
    text?: string;
}
