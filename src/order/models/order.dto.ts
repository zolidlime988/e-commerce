import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { IsProductExist } from "../../utils/validators/IsProductExist";
import { Type } from "class-transformer";

export class CreateOrders {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Order)
  @ValidateNested({ each: true })
  orders: Order[];
}

export class Order {
  @IsNotEmpty()
  @IsProductExist()
  product_id: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}