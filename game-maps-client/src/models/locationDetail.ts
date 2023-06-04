import { IMarker } from "./marker";

export interface ILocationDetail {
    "title"?: string;
    "description"?: string;
    "latitude": number;
    "longitude": number,
    "features"?: string,
    "ignMarkerId"?: string,
    "ignPageId"?: string,
    "isDone": boolean,
    type?: "location" | "mark";
    "medias"?: {
        "title"?: string,
        "fileName"?: string,
        "attribution"?: string,
        "type"?: string,
        "mimeType"?: string,
        "meta"?: string,
        "order"?: number,
    }[]
}