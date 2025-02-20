import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, map, type Observable } from 'rxjs';
import { EnvironmentService } from 'src/environment/environment.service';
import type {
  TWeather,
  TWeatherResponse,
  WeatherQueryParams,
} from './weather.types';

@Injectable()
export class WeatherService {
  private readonly openWeatherMapUrl =
    'https://api.openweathermap.org/data/2.5/weather';

  constructor(
    private readonly httpService: HttpService,
    private readonly environmentService: EnvironmentService,
  ) {}

  getWeather({ lat, lon }: WeatherQueryParams): Observable<TWeather> {
    return this.httpService
      .get<TWeatherResponse>(this.openWeatherMapUrl, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: this.environmentService.getOpenWeatherMapApiKey(),
        },
      })
      .pipe(
        map(
          (response): TWeather => ({
            city: response.data.name,
            temp: Number(response.data.main.temp.toFixed(1)),
            feltTemp: Number(response.data.main.feels_like.toFixed(1)),
            humidity: response.data.main.humidity,
            windSpeed: Math.round(response.data.wind.speed),
            clouds: response.data.clouds.all,
            icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
          }),
        ),
        catchError((error) => {
          console.error('Error on weather fetch : ', error);
          throw new HttpException(
            'Failed to fetch weather data',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }
}
