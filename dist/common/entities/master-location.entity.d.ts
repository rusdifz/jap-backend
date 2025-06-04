import { IMasterLocation } from '../interfaces/master-location';
export declare class MasterLocationDB implements IMasterLocation {
    id?: number;
    location_name: string;
    position: number;
    activate_home: boolean;
    url_image: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    created_by: string;
    updated_by?: string;
    deleted_by?: string;
}
