import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { EnvironmentModule } from './environment/environment.module';

@Module({
  imports: [CityModule, EnvironmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
