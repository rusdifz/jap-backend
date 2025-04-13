import { GeneratePDFDTO, ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from './dto/request.dto';
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
        data: import("./dto/response.dto").ResProperty[];
        count: number;
    }>;
    create(user: IJwtUser, body: ReqCreatePropertyDTO): Promise<ReqCreatePropertyDTO>;
    update(user: IJwtUser, bodyparam: ReqUpdatePropertyDTO): Promise<ReqUpdatePropertyDTO>;
    deleteOne(id: number, user: IJwtUser): Promise<Object>;
    checkForStaleDataOlderThanOneMonth(): Promise<any[]>;
    convertFileExcelToDB(): Promise<any[]>;
    generatePdfComparisson(res: any, location: string, query: GeneratePDFDTO, user: IJwtUser): Promise<void>;
    generatePdfPropertyDetail(res: any, slug: string): Promise<void>;
}
