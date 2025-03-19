// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, UpdateResult } from 'typeorm';

// // import { OfficesDB } from 'apps/master/src/modules/office/entities/office.entity';
// // import { MediaOfficesDB } from 'apps/master/src/modules/office/entities/media-offices.entity';
// @Injectable()
// export class ImagesRepository {
//   constructor(
//     @InjectRepository(MediaOfficesDB)
//     private readonly imagesDB: Repository<MediaOfficesDB>,
//   ) {}

//   async upsert(payload: Partial<MediaOfficesDB>): Promise<MediaOfficesDB> {
//     return await this.imagesDB.save(payload);
//   }
// }
