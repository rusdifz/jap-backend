import { IJwtUser } from 'src/common';
import { DashboardPropertiesRepository } from '../properties.repository';
import { PdfComparisonDTO, PdfDetailDTO } from '../dto/request.dto';
import { DashboardUnitsService } from '../../units/units.service';
export declare class DashboardPropertiesGenerateFileService {
    private readonly repository;
    private readonly unitService;
    constructor(repository: DashboardPropertiesRepository, unitService: DashboardUnitsService);
    private rootPathImageJAP;
    generatePDFComparisson(property_id: number[], admin: IJwtUser): Promise<Buffer>;
    generatePDFDetailProperty(property_slug: string): Promise<Buffer>;
    generatePDFComparissonNew(propertiesData: PdfComparisonDTO, admin: IJwtUser): Promise<Buffer>;
    generatePDFDetailPropertyDetail(propertiesData: PdfDetailDTO): Promise<Buffer>;
}
