import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
  signal,
} from '@angular/core';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Locations {
  locationService = inject(LocationService);

  origin = signal<string | undefined>(undefined);
  locations = resource({
    params: () => ({ origin: this.origin() }),
    loader: ({ params }) => this.locationService.getLocations(params),
  });

  constructor() {
    afterNextRender(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`${position.coords.latitude},${position.coords.longitude}`);
        this.origin.set(`${position.coords.latitude},${position.coords.longitude}`);
      });
    });
  }
}
