import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './models/Level';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([Level])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
