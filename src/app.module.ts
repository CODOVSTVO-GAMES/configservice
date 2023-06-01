import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './models/Level';
import { CreateBuildings } from './models/CreateBuildings';
import { MainBuilding } from './models/MainBuilding';
import { MergeBarracks } from './models/MergeBarracks';
import { MergeMining } from './models/MergeMining';
import { RepairBuilding } from './models/RepairBuilding';
import { Units } from './models/Units';
import { RadarExperience } from './models/RadarExperience';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([Level, CreateBuildings, MainBuilding, MergeBarracks, MergeMining, RepairBuilding, Units, RadarExperience])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
