import { Component, Input, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MarkerInfo } from 'src/app/models/marker-info';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() site: Site;
  @Input() allSites: Site[];
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  infoWindowOptions: google.maps.InfoWindowOptions;
  markers: MarkerInfo[] = [];
  center: google.maps.LatLngLiteral = {
    lat: 51.5074, lng: -0.1278
  };
  zoom = 2;


  onMarkerMouseOver(markerInfo: MarkerInfo, marker: MapMarker) {
    if (this.infoWindow != undefined) {
      this.infoWindowOptions = {
        content: `
          <div>
            <p>Name : ${markerInfo.site.name}</p>
            <p>Capacity : ${markerInfo.site.systemCapacity}</p>
          </div>
        `
      };
      this.infoWindow.open(marker);
    }
  }

  onMarkerMouseOut(markerInfo: MarkerInfo) {
    if (this.infoWindow != undefined) {
      this.infoWindow.close();
    }
  }

  onMapTilesLoaded() {
    this.getMarkerData();
  }

  private getMarkerData(): void {
    this.allSites?.forEach(eachSite => {
      const proportionalRadius = (eachSite.systemCapacity / 100000) * 5;
      this.markers.push({
        position:
          { lat: eachSite.latitude, lng: eachSite.longitude },
        label: eachSite.id.toString(),
        site: eachSite,
        markerOptions: {
          icon: {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + ((proportionalRadius + 2) * 2) + "' height='"
              + ((proportionalRadius + 2) * 2) + "' %3E%3Ccircle cx='"
              + (proportionalRadius + 2) + "' cy='" + (proportionalRadius + 2) + "' r='"
              + proportionalRadius + "' stroke='green' stroke-width='1' fill='yellow' /%3E%3C/svg%3E%0A"
          }
        }
      });
    });
  }
}
