import { MediaTypeEnum, MimeTypeEnum } from '../enums';
import { IMedia } from '../interfaces/media.interface';
import { PropertiesDB } from './property.entity';
export declare class MediaDB implements IMedia {
    media_id: string;
    property_id: number;
    host: string;
    path: string;
    name: string;
    type: MediaTypeEnum;
    mimetype: MimeTypeEnum | string;
    full_url: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    property: PropertiesDB;
}
