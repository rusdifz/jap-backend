import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import {
  AuthorizationHeader,
  BodyParam,
  CommonHeaders,
  IJwtUser,
  UserAuth,
} from 'src/common';

import { swgLoginOK, swgSignupOK } from './swaggers/endpoint.swagger';
import { AuthDTO, ReqCreateUserDTO } from './dto/request.dto';
// import { AuthGuard } from '../../middlewares/guards/auth.guard';

import { AuthService } from './auth.service';

@Controller('auth')
@CommonHeaders()
@ApiTags('Controller Auth Module')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'endpoint login' })
  @ApiHeader(AuthorizationHeader(true))
  @ApiOkResponse(swgLoginOK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Version('1')
  @Post('login')
  async login(@Body() body: AuthDTO) {
    console.log('this auth');

    return await this.service.login(body);
  }

  @ApiOperation({ summary: 'endpoint create new user' })
  @ApiHeader(AuthorizationHeader(true))
  @ApiOkResponse(swgSignupOK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  // @UseGuards(AuthGuard)
  @Version('1')
  @Post('signup')
  async create(@UserAuth() user: IJwtUser, @Body() body: ReqCreateUserDTO) {
    return await this.service.signup(body, user);
  }

  @ApiOperation({ summary: 'endpoint change password' })
  @ApiHeader(AuthorizationHeader(true))
  @ApiOkResponse(swgLoginOK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  // @UseGuards(AuthGuard)
  @Version('1')
  @Post('change-password')
  async changePassword(@Body() body: AuthDTO) {
    return await this.service.changePassword(body);
  }
}
