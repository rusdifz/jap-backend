import { DataSource, Repository } from 'typeorm';
import { BaseRepository, PropertiesDB, PropertyPicDB } from 'src/common';
import { ReqGetPicListDTO } from './dto/request.dto';
export declare class DashboardPropertiesRepository extends BaseRepository<PropertiesDB> {
    private picEntity;
    constructor(dataSource: DataSource, picEntity: Repository<PropertyPicDB>);
    findListPic(props: ReqGetPicListDTO): Promise<{
        data: PropertyPicDB[];
        count: number;
    }>;
    savePic(data: any): Promise<any>;
    updatePic(data: any, pic_id: string): Promise<import("typeorm").UpdateResult>;
    deletePic(pic_id: string): Promise<import("typeorm").DeleteResult>;
}
