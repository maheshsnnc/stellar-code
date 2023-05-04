export class Site {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    city: string;
    state: string;
    systemCapacity: number;
    timeOffset: number;
}

export class ProductionSite extends Site {
    azimuth: number;
    losses: number;
    array_type: number;
    module_type: number;
    gcr: number;
    dc_ac_ratio: number;
    inv_eff: number;
    radius: number;
    dataset: string;
    tilt: number;
    address: string;
    soiling: number[];
    albedo: number;
    bifaciality: number;
}