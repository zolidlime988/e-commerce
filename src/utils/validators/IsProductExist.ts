import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ProductService } from "../../product/product.service";

@ValidatorConstraint({ name: 'IsProductExistRule', async: true })
@Injectable()
export class IsProductExistRule implements ValidatorConstraintInterface {
  constructor(private productService: ProductService) {}

  async validate(product_id: number, args: ValidationArguments) {
    const isProductExist = await this.productService.getProductById(product_id);
    return !!isProductExist;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}: ${args.value} does not exist!!`;
  }
}

export function IsProductExist(validatorOptions?: ValidationOptions) {
  return function (object: any, propertyName: any) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      validator: IsProductExistRule,
    });
  };
}
