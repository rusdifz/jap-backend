import { DashboardPropertiesRepository } from '../properties.repository';
export declare class DashboardPropertiesGenerateFileService {
    private readonly repository;
    constructor(repository: DashboardPropertiesRepository);
    private rootPathImageJAP;
    generatePDFComparisson(property_id: number[]): Promise<Buffer>;
    generatePDFDetailProperty(property_slug: string): Promise<Buffer>;
}
