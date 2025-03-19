import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersDB } from 'src/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDB])],
  providers: [
    {
      provide: Object,
      useValue: [UsersDB],
    },
    AuthRepository,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
