import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { IsProductExistRule } from "../utils/validators/IsProductExist";
import { ProductModule } from "../product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetailEntity, OrderEntity } from "./models/order.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forFeature([OrderEntity, OrderDetailEntity])
  ],
  controllers: [OrderController],
  providers: [OrderService, IsProductExistRule],
})
export class OrderModule {}
