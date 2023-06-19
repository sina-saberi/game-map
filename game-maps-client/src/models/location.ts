import { IMarker } from "./marker";

export interface ILocation {
    id: number;
    categorieName?: string,
    latitude: number,
    longitude: number,
    isNewItem?: boolean,
    icon?: string,
    type?: "location" | "mark"
    marker?: IMarker;
    isDone: boolean;
    title: string
}