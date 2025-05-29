import { GeneratePDFDTO, PdfComparisonDTO, PdfDetailDTO, ReqCreatePropertyDTO, ReqCreatePropertyPicDTO, ReqGetPicListDTO, ReqUpdatePropertyDTO, ReqUpdatePropertyPicDTO } from './dto/request.dto';
import { IJwtUser } from 'src/common';
import { PropertiesDTO } from './dto/request.dto';
import { DashboardPropertiesService } from './services/properties.service';
import { DashboardPropertiesGenerateFileService } from './services/properties-generate-file.service';
export declare class DashboardPropertiesController {
    private readonly service;
    private readonly serviceGenerateFile;
    constructor(service: DashboardPropertiesService, serviceGenerateFile: DashboardPropertiesGenerateFileService);
    getDetail(id: number | string): Promise<any>;
    getList(query: PropertiesDTO): Promise<{
        data: any[];
        count: number;
    }>;
    create(user: IJwtUser, body: ReqCreatePropertyDTO): Promise<ReqCreatePropertyDTO>;
    update(user: IJwtUser, bodyparam: ReqUpdatePropertyDTO): Promise<ReqUpdatePropertyDTO>;
    deleteOne(id: number, user: IJwtUser): Promise<Object>;
    getListPic(query: ReqGetPicListDTO): Promise<{
        data: any[];
        count: number;
    }>;
    createPic(user: IJwtUser, body: ReqCreatePropertyPicDTO): Promise<ReqCreatePropertyPicDTO>;
    updatePic(user: IJwtUser, bodyparam: ReqUpdatePropertyPicDTO): Promise<ReqUpdatePropertyPicDTO>;
    deleteOnePic(id: string, user: IJwtUser): Promise<Object>;
    checkForStaleDataOlderThanOneMonth(): Promise<any[]>;
    convertFileExcelToDB(): Promise<any[]>;
    generatePdfComparisson(res: any, location: string, query: GeneratePDFDTO, user: IJwtUser): Promise<void>;
    generatePdfComparissonNew(res: any, body: PdfComparisonDTO, user: IJwtUser): Promise<void>;
    generatePdfPropertyDetail(res: any, slug: string): Promise<void>;
    generatePdfPropertyDetailNew(res: any, body: PdfDetailDTO): Promise<void>;
}
