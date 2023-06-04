import { ICategorie } from "./categorie";

export interface IGroups {
    "title": string,
    "color": string,
    "order": number,
    "expandable": boolean,
    "categories": ICategorie[]
}

