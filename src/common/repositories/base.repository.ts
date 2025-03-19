import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, DeepPartial, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class BaseRepository<E> extends Repository<E> {
  dataSource: DataSource;
  constructor(target: EntityTarget<E>, dtSource: DataSource) {
    super(target, dtSource.createEntityManager(), dtSource.createQueryRunner());
    this.dataSource = dtSource;
  }

  async softDeleteAndLog<T extends DeepPartial<E>>(entity: T) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      await queryRunner.manager.getRepository(this.target).save(entity);
      const softDelete = await queryRunner.manager
        .getRepository(this.target)
        .softRemove(entity);

      await queryRunner.commitTransaction();

      return softDelete;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transaction failed');
    } finally {
      await queryRunner.release();
    }
  }

  async sort(query: Object, props: any) {
    if (props.sort && props.order) {
      Object.assign(query, {
        order: {
          [props.sort]: props.order.toLowerCase() === 'asc' ? 'ASC' : 'DESC',
        },
      });
    }

    return query;
  }

  async paginate(query: Object, props: any) {
    if (props.limit) {
      Object.assign(query, { take: props.limit });
    }
    if (props.page) {
      Object.assign(query, { skip: (props.page - 1) * props.limit });
    }

    return query;
  }
}
