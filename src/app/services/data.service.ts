import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductionSite, Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private openWeatherApiKey: string = "c7cecbff9f158706f28f2948cad813ed";
  private nrelApiKey: string = "A0YIKarKXaVwAGjVZtvVpCiyyhIMjU3ik0MQiu3m";

  constructor(private http: HttpClient) {
  }

  public getSiteDetails(): Promise<Site[]> {
    return new Promise<Site[]>((resolve, reject) => {
      const listItems: Site[] = [
        { id: 1, name: 'Site A', city: 'Los Banos', elevation: 137.16, latitude: 37, longitude: -121, state: 'CA', systemCapacity: 239113, timeOffset: -8 },
        { id: 2, name: 'Site B', city: 'Boulder City', elevation: 527.3, latitude: 35.85, longitude: -114.97, state: 'NV', systemCapacity: 132344, timeOffset: -8 },
      ];
      if (listItems.length > 0) {
        resolve(listItems);
      } else {
        reject('No items found');
      }
    });
  }

  public getWeatherData(lat: number, lng: number): any {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${this.openWeatherApiKey}`;
    return this.http.get(url).toPromise().then(data => {
      return data;
    });
  }

  public getHistoricalData(lat: number, lng: number): any {
    //Hard coding with some random data as Historical Data API is not free from OpenWeather and it requires subscription
    return new Promise<any[]>((resolve, reject) => {
      let radianceData = [];
      let tempData = [];
      let windData = [];
      let today = new Date();
      for (let i = 0; i < 7; i++) {
        let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        radianceData.push({
          "name": date.toDateString(),
          "value": Math.floor(Math.random() * 2) + 1
        });
        tempData.push({
          "name": date.toDateString(),
          "value": Math.floor(Math.random() * 10) + 1
        });
        windData.push({
          "name": date.toDateString(),
          "value": Math.floor(Math.random() * 100) + 1
        })
      };
      const listItems: any[] = [
        {
          "name": "Irradiance",
          "series": radianceData
        },
        {
          "name": "Ambient Temperature",
          "series": tempData
        }, {
          "name": "Wind Speed",
          "series": windData
        },
      ];
      if (listItems.length > 0) {
        resolve(listItems);
      } else {
        reject('No items found');
      }
    });

    // const url = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${this.openWeatherApiKey}`;
    // return this.http.get(url).toPromise().then(data => {
    //   console.log(data);
    //   return data;
    // });
  }

  getPVWattsData(productionSite: ProductionSite): any {
    const url = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${this.nrelApiKey}&lat=${productionSite.latitude}&lon=${productionSite.longitude}&system_capacity=${productionSite.systemCapacity}&module_type=${productionSite.module_type}&losses=
        ${productionSite.losses}&array_type=${productionSite.array_type}&tilt=${productionSite.tilt}&azimuth=${productionSite.azimuth} `;
    return this.http.get<any>(url).toPromise().then(data => {
      return data;
    });
  }

  getProductionSitesData(): ProductionSite[] {
    return [
      {
        id: 1, name: 'Site A', city: 'Los Banos', elevation: 137.16, latitude: 37, longitude: -121, state: 'CA', systemCapacity: 239113, timeOffset: -8
        , azimuth: 0, address: "Los Banos, CA", albedo: 0.2, array_type: 2, bifaciality: 0.9, dataset: "nsrdb", dc_ac_ratio: 1.2, gcr: 0.4, inv_eff: 99.0, tilt: 0, losses: 14, module_type: 1, radius: 0, soiling: [3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1]
      },
      {
        id: 2, name: 'Site B', city: 'Boulder City', elevation: 527.3, latitude: 35.85, longitude: -114.97, state: 'NV', systemCapacity: 132344, timeOffset: -8
        , azimuth: 0, address: "Boulder City, NV", albedo: 0.2, array_type: 2, bifaciality: 0, dataset: "nsrdb", dc_ac_ratio: 1.2, gcr: 0.4, inv_eff: 99.0, tilt: 0, losses: 14, module_type: 1, radius: 0, soiling: [2.3, 2.6, 1.8, 2.1, 1.2, 0.9, 1.9, 0.8, 0.5, 1.6, 2.5, 2.1]
      },

    ]
  }
}
