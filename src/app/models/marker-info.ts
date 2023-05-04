import { Site } from "./site";

export class MarkerInfo {
    position: google.maps.LatLngLiteral;
    label: string;
    site: Site;
    markerOptions: google.maps.MarkerOptions;
}