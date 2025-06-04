import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager } from 'typeorm';
export declare class IsExistConstraint implements ValidatorConstraintInterface {
    private entityManager;
    constructor(entityManager: EntityManager);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsExist(entityClass: any, field: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
