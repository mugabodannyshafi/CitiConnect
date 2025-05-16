import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class IsPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: string) {
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      return phoneRegex.test(value);
    }
  
    defaultMessage() {
      return 'Value must be a valid phone number';
    }
  }
  
  export function IsPhone(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsPhoneConstraint,
      });
    };
  }