import { GeneratePDFDTO, ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from './dto/request.dto';
import { IJwtUser } from 'src/common';
import { PropertiesDTO } from './dto/request.dto';
import { DashboardPropertiesService } from './properties.service';
export declare class DashboardPropertiesController {
    private readonly service;
    constructor(service: DashboardPropertiesService);
    getDetail(id: number): Promise<import("./dto/response.dto").ResProperty>;
    getList(query: PropertiesDTO): Promise<{
        data: import("./dto/response.dto").ResProperty[];
        count: number;
    }>;
    create(user: IJwtUser, body: ReqCreatePropertyDTO): Promise<ReqCreatePropertyDTO>;
    update(user: IJwtUser, bodyparam: ReqUpdatePropertyDTO): Promise<ReqUpdatePropertyDTO>;
    deleteOne(id: number, user: IJwtUser): Promise<Object>;
    convertFileExcelToDB(): Promise<any[]>;
    generatePdf(res: any, query: GeneratePDFDTO): Promise<void>;
    generatePdfContoh(res: any, query: GeneratePDFDTO): Promise<void>;
}
