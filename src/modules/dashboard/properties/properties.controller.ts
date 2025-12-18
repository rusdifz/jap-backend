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
} from '@nestjs/swagger';

import {
  BulkImageDTO,
  GeneratePDFDTO,
  PdfComparisonDTO,
  PdfDetailDTO,
  ReqCreatePropertyDTO,
  // ReqCreatePropertyPicDTO,
  // ReqGetPicListDTO,
  // ReqUpdatePropertyPicDTO,
  ReqUpdatePropertyDTO,
} from './dto/request.dto';
import {
  swgCreateOK,
  swgGetDetailOK,
  swgGetListOK,
} from './swaggers/endpoint.swagger';

import { AuthorizationHeader, BodyParam, IJwtUser, UserAuth } from 'src/common';

import { AuthGuard } from '../../../middlewares/guards/auth.guard';

import { PropertiesDTO } from './dto/request.dto';

import { DashboardPropertiesService } from './services/properties.service';
import { DashboardPropertiesGenerateFileService } from './services/properties-generate-file.service';

@Controller('dashboard/properties')
@UseGuards(AuthGuard)
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
  async getDetail(@Param('id') id: number | string) {
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
    console.log('Log Query Get List Properties in Dashboard : ', query);
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
    console.log('Log Data Create Properties By User Admin : ', user);
    console.log('Log Body Create Properties in Dashboard : ', body);

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
    console.log('Log Data Update Properties By User Admin : ', user);
    console.log('Log Body Update Properties in Dashboard : ', bodyparam);
    return await this.service.update(bodyparam, user);
  }

  // @ApiOperation({
  //   summary: 'endpoint update office',
  //   description: '',
  // })
  // @ApiHeader(AuthorizationHeader(true))
  // @ApiCreatedResponse(swgCreateOK)
  // @Version('1')
  // @Throttle({ default: { limit: 10, ttl: 60000 } })
  // @Put(':id')
  // async updateThumbnail(
  //   @UserAuth() user: IJwtUser, // use this to get user data from header
  //   @BodyParam() bodyparam: ReqUpdatePropertyDTO,
  // ) {
  //   return await this.service.update(bodyparam, user);
  // }

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
  @Get('older-data/one-month')
  async checkForStaleDataOlderThanOneMonth() {
    return await this.service.checkForStaleDataOlderThanOneMonth();
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

  @Version('1')
  @Get('excel/units')
  async insertUnitBulkFromExcel() {
    return await this.service.editBulkFromExcel();
  }

  @Version('1')
  @Post('pdf/comparison')
  async generatePdfComparissonNew(
    @Res() res: any,
    @Body() body: PdfComparisonDTO,
    @UserAuth() user: IJwtUser,
  ) {
    const pdfBuffer = await this.serviceGenerateFile.generatePDFComparisson(
      body,
      user,
    );

    const namePdf = 'Building Comparisson - ' + body.location;
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${namePdf}.pdf"`,
    });
    res.send(pdfBuffer);
  }

  @Version('1')
  @Post('pdf/detail')
  async generatePdfPropertyDetailNew(
    @Res() res: any,
    @Body() body: PdfDetailDTO,
  ) {
    console.log('body', body);

    const pdfBuffer =
      await this.serviceGenerateFile.generatePDFDetailProperty(body);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="property-detail-${body.location ?? ''}.pdf"`,
    });
    res.send(pdfBuffer);
  }

  @Version('1')
  @Get('bulk/image')
  async bulkImage(@Query() query: BulkImageDTO) {
    return await this.service.inputImageBulkByLocation(
      query.location,
      query.type,
    );
  }

  @Version('1')
  @Get('bulk/image/thumbnail')
  async bulkImageThumbail(@Query() query: BulkImageDTO) {
    return await this.service.inputImageBulkThumbnailByLocation(query.location);
  }
}
