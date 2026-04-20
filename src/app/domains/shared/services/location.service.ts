import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Location } from '@shared/models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  async getLocations(params: { origin?: string }): Promise<Location[]> {
    const url = new URL(`${environment.apiUrl}/api/v1/locations`);
    if (params.origin) {
      url.searchParams.set('origin', params.origin);
    }
    return await fetch(url.toString())
      .then((response) => response.json())
      .then((response) => response);
  }
}
