import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import type { WeatherQueryParams } from './weather.types';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query() query: WeatherQueryParams) {
    return this.weatherService.getWeather(query);
  }
}
