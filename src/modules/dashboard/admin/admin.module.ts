import { Module } from '@nestjs/common';

import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDB } from 'src/common';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDB])],
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
})
export class AdminModule {}
