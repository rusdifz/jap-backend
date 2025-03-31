import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager } from 'typeorm';
export declare class IsUniqueConstraint implements ValidatorConstraintInterface {
    private entityManager;
    constructor(entityManager: EntityManager);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsUnique(entityClass: any, field: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
