import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { catchError, map, of, type Observable } from 'rxjs';
import { EnvironmentService } from 'src/environment/environment.service';
import type { TAdressesResponse, TCity, TFavoriteCity } from './city.types';

@Injectable()
export class CityService {
  private readonly gouvAdressesUrl = 'https://data.geopf.fr/geocodage/search';
  private supabaseClient: SupabaseClient = createClient(
    this.environmentService.getSupabaseUrl(),
    this.environmentService.getSupabaseKey(),
  );

  constructor(
    private readonly httpService: HttpService,
    private readonly environmentService: EnvironmentService,
  ) {}

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

  async saveFavoriteCity(
    favoriteCity: TFavoriteCity,
  ): Promise<{ status: 'success' | 'error' }> {
    const { error } = await this.supabaseClient
      .from('favoritesCities')
      .insert(favoriteCity);

    return { status: Boolean(error) ? 'error' : 'success' };
  }

  async deleteFavoriteCity(city: string) {
    const { error } = await this.supabaseClient
      .from('favoritesCities')
      .delete()
      .eq('label', city);

    return { status: Boolean(error) ? 'error' : 'success' };
  }
}
