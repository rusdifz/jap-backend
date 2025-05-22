import { IMasterLocation } from 'src/common/interfaces/master-location';
export declare class ResLocation implements Partial<IMasterLocation> {
    id: number;
    location_name: string;
    position: number;
    url_image: string;
    activate_home: boolean;
}
