import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBuildings } from 'src/models/CreateBuildings';
import { Level } from 'src/models/Level';
import { MainBuilding } from 'src/models/MainBuilding';
import { MapEnemyTeams } from 'src/models/MapEnemyTeams';
import { MergeBarracks } from 'src/models/MergeBarracks';
import { MergeMining } from 'src/models/MergeMining';
import { RadarExperience } from 'src/models/RadarExperience';
import { RepairBuilding } from 'src/models/RepairBuilding';
import { Units } from 'src/models/Units';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'psqldb',
      port: 5432,
      username: 'keshox',
      password: 'example',
      database: 'configdb',
      entities: [Level, CreateBuildings, MainBuilding, MergeBarracks, MergeMining, RepairBuilding, Units, RadarExperience, MapEnemyTeams],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class PostgresModule { }
