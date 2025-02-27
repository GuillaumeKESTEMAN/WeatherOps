import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { TFavoriteCity } from './city.types';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getCity(@Query() query: { search: string }) {
    return this.cityService.getCity(query.search);
  }

  @Post('favorite')
  async saveFavoriteCity(@Body() body: TFavoriteCity) {
    return this.cityService.saveFavoriteCity(body);
  }

  @Delete('favorite')
  async deleteFavoriteCity(@Query() query: { city: string }) {
    return this.cityService.deleteFavoriteCity(query.city);
  }
}
