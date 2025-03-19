import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface DbConfigInterface {
    db: TypeOrmModuleOptions;
}
