import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertiesDB } from 'src/common';

import { ClientPropertiesRepository } from './properties.repository';
import { ClientPropertiesService } from './properties.service';
import { ClientPropertiesController } from './properties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PropertiesDB])],
  providers: [ClientPropertiesRepository, ClientPropertiesService],
  controllers: [ClientPropertiesController],
})
export class ClientPropertiesModule {}
