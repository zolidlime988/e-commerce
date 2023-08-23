import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegisterProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class UpdateProduct extends RegisterProduct {
  @IsNotEmpty()
  @IsInt()
  product_id;
}