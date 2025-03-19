import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entityClass, entityProperty] = args.constraints;
    const repositorys = this.entityManager.getRepository(entityClass);
    const where = {
      where: { [entityProperty]: value },
    };
    if (args.object['id']) {
      where.where['id'] = args.object['id'];
    }

    const foundEntity = await repositorys.findOne(where);

    return foundEntity?.id !== undefined ? true : false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be exist`;
  }
}

export function IsExist(
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
      validator: IsExistConstraint,
    });
  };
}
