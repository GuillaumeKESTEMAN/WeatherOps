import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  getOpenWeatherMapApiKey(): string {
    return this.configService.get<string>('OPEN_WEATHER_MAP_API_KEY');
  }
}
