import { IJwtUser } from 'src/common';
import { DashboardPropertiesRepository } from '../properties.repository';
import { PdfComparisonDTO, PdfDetailDTO } from '../dto/request.dto';
import { DashboardUnitsService } from '../../units/units.service';
export declare class DashboardPropertiesGenerateFileService {
    private readonly repository;
    private readonly unitService;
    constructor(repository: DashboardPropertiesRepository, unitService: DashboardUnitsService);
    generatePDFComparisson(propertiesData: PdfComparisonDTO, admin: IJwtUser): Promise<Buffer>;
    generatePDFDetailProperty(propertiesData: PdfDetailDTO): Promise<Buffer>;
    fetchImage(src: any): Promise<any>;
}
