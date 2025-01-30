import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, map, of, type Observable } from 'rxjs';
import type { TAdressesResponse, TCity } from './city.types';

@Injectable()
export class CityService {
  private readonly gouvAdressesUrl = 'https://data.geopf.fr/geocodage/search';

  constructor(private readonly httpService: HttpService) {}

  async getCity(searchLabel: string): Promise<Observable<TCity[]>> {
    return this.httpService
      .get<TAdressesResponse>(this.gouvAdressesUrl, {
        params: {
          q: searchLabel,
          limit: 10,
          type: 'municipality',
        },
      })
      .pipe(
        map((response) =>
          response.data.features.map<TCity>((feature) => ({
            id: feature.properties.id,
            label: feature.properties.city,
            lat: feature.geometry.coordinates[1].toString(),
            lon: feature.geometry.coordinates[0].toString(),
          })),
        ),
        catchError(() => of([])),
      );
  }
}
