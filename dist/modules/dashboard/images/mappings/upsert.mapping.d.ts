import { MediaDB, MediaReferenceType } from 'src/common';
export declare function mapInsertDB(file: Express.Multer.File, reference_id: number, reference_type: MediaReferenceType): Promise<Partial<MediaDB>>;
