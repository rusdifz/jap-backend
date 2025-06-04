import { IMasterLocation } from 'src/common/interfaces/master-location';
export declare class ReqCreateMasterLocationDTO implements Partial<IMasterLocation> {
    location_name: string;
    position: number;
    activate_homepage: boolean;
}
export declare class ReqUpdateMasterLocationDTO extends ReqCreateMasterLocationDTO {
    id: number;
}
