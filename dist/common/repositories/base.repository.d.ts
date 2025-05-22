import { DataSource, DeepPartial, EntityTarget, Repository } from 'typeorm';
export declare class BaseRepository<E> extends Repository<E> {
    dataSource: DataSource;
    constructor(target: EntityTarget<E>, dtSource: DataSource);
    softDeleteAndLog<T extends DeepPartial<E>>(entity: T): Promise<T & E>;
    sort(query: Object, props: any): Promise<Object>;
    paginate(query: Object, props: any): Promise<Object>;
}
