export interface IMap {
    slug: string
    title: string
}

export interface IMapDetail {
    description: string
    extension: string
    maxZoom: number
    minZoom: number
    path: string
    slug: string
    title: string
    startLatBound: number;
    startLonBound: number;
    endtLatBound: number;
    endtLonBound: number;
    initialLat: number;
    initialLon: number;
    initialZoom: number;
}