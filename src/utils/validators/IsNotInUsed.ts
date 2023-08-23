import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ name: 'IsNotInUsedRule', async: true })
@Injectable()
export class IsNotInUsedRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string, args: ValidationArguments) {
    const foundUser = await this.userService.findUserByKeyword(
      args.property,
      value,
    );
    return !foundUser;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}: ${args.value} has already been used`;
  }
}

export function IsNotInUsed(validatorOptions?: ValidationOptions) {
  return function (object: any, propertyName: any) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      validator: IsNotInUsedRule,
    });
  };
}
