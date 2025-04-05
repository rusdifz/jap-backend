import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
  Res,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  GeneratePDFDTO,
  ReqCreatePropertyDTO,
  ReqUpdatePropertyDTO,
} from './dto/request.dto';
import {
  swgCreateOK,
  swgGetDetailOK,
  swgGetListOK,
} from './swaggers/endpoint.swagger';

import {
  AuthorizationHeader,
  BodyParam,
  CommonHeaders,
  IJwtUser,
  swgDeleteOK,
  UserAuth,
} from 'src/common';

import { AuthGuard } from '../../../middlewares/guards/auth.guard';

import { PropertiesDTO } from './dto/request.dto';

import { DashboardPropertiesService } from './services/properties.service';
import { DashboardPropertiesGenerateFileService } from './services/properties-generate-file.service';

@Controller('dashboard/properties')
// @UseGuards(AuthGuard)
export class DashboardPropertiesController {
  constructor(
    private readonly service: DashboardPropertiesService,
    private readonly serviceGenerateFile: DashboardPropertiesGenerateFileService,
  ) {}

  @ApiOperation({
    summary: 'endpoint get office detail',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiOkResponse(swgGetDetailOK)
  @Version('1')
  @Get(':id')
  async getDetail(@Param('id') id: number) {
    return await this.service.get(id);
  }

  @ApiOperation({
    summary: 'endpoint get office list',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiOkResponse(swgGetListOK)
  @Version('1')
  @Get('')
  async getList(@Query() query: PropertiesDTO) {
    return await this.service.getList(query);
  }

  @ApiOperation({
    summary: 'endpoint create office',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiCreatedResponse(swgCreateOK)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('')
  async create(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @Body() body: ReqCreatePropertyDTO,
  ) {
    return await this.service.create(body, user);
  }

  @ApiOperation({
    summary: 'endpoint update office',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiCreatedResponse(swgCreateOK)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id')
  async update(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @BodyParam() bodyparam: ReqUpdatePropertyDTO,
  ) {
    return await this.service.update(bodyparam, user);
  }

  @ApiOperation({
    summary: 'endpoint delete office',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  //   @ApiOkResponse(swgDeleteOK)
  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @UserAuth() user: IJwtUser) {
    return await this.service.delete(id, user);
  }

  // @ApiOperation({
  //   summary: 'endpoint get office list',
  //   description: '',
  // })
  // @ApiHeader(AuthorizationHeader(true))
  // @ApiOkResponse(swgGetListOK)
  @Version('1')
  @Get('excel/convert')
  async convertFileExcelToDB() {
    return await this.service.inputBulkFromExcel();
  }

  @Get('pdf/comparisson/:location')
  async generatePdfComparisson(
    @Res() res: any,
    @Param('location') location: string,
    @Query() query: GeneratePDFDTO,
  ) {
    const pdfBuffer = await this.serviceGenerateFile.generatePDFComparisson(
      query.property_id,
    );

    const namePdf = 'Building Comparisson - ' + location;
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${namePdf}.pdf"`,
    });
    res.send(pdfBuffer);
  }

  @Get('pdf/detail/:slug')
  async generatePdfPropertyDetail(
    @Res() res: any,
    @Param('slug') slug: string,
  ) {
    const pdfBuffer =
      await this.serviceGenerateFile.generatePDFDetailProperty(slug);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${slug}.pdf"`,
    });
    res.send(pdfBuffer);
  }
}
