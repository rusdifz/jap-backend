import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager, FindOneOptions, Not } from 'typeorm';
import { generateSlug } from '../helpers';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entityClass, entityProperty] = args.constraints;
    const repositorys = this.entityManager.getRepository(entityClass);

    const where: FindOneOptions = {
      where: { [entityProperty]: value },
    };

    if (args.object['property_id']) {
      where.where['property_id'] = Not(args.object['property_id']);
    }

    if (args.object['unit_id']) {
      where.where['unit_id'] = Not(args.object['unit_id']);
    }

    if (args.object['article_id']) {
      where.where['article_id'] = Not(args.object['article_id']);
    }

    if (entityProperty == 'title' || entityProperty == 'name') {
      args.object['slug'] = generateSlug(value);
      delete where.where['title'];
      where.where['slug'] = args.object['slug'];
    }

    const foundEntity = await repositorys.findOne(where);

    return !foundEntity;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be unique`;
  }
}

export function IsUnique(
  entityClass: any,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityClass, field, validationOptions],
      validator: IsUniqueConstraint,
    });
  };
}
