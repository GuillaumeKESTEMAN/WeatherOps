import { Controller, Get, Query } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getCity(@Query() query: { search: string }) {
    return await this.cityService.getCity(query.search);
  }
}
