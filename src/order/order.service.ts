import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OrderDetailEntity, OrderEntity } from "./models/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user/user.service";
import { Order } from "./models/order.dto";
import { ProductService } from "../product/product.service";
import { dataSource } from "../data-source";
import { ProductEntity } from "../product/models/product.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
    private userService: UserService
  ) {
  }

  async createOrder(username: string, orders: Order[]) {
    const user = await this.userService.findUserByUsername(username);
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const insertResult = await queryRunner.manager.insert(OrderEntity, { user });
      const order = insertResult.generatedMaps[0] as OrderEntity;

      for (const orderDetail of orders) {
        const product_id = orderDetail.product_id;
        const product = await queryRunner.manager.findOne(ProductEntity, { where: { product_id } });
        if (product.quantity < orderDetail.quantity) {
          throw new BadRequestException("Ordered quantity is too little for this");
        }
        product.quantity = product.quantity - orderDetail.quantity;
        await queryRunner.manager.update(ProductEntity, product.product_id, product);
        await queryRunner.manager.insert(OrderDetailEntity, {
          order,
          product,
          quantity: orderDetail.quantity,
          price: product.price
        });
      }
      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async cancelOrder(username: string, order_id: number) {
    const user = await this.userService.findUserByUsername(username);
    return await this.orderRepository.update({
      user,
      order_id
    }, {
      is_delete: true
    });
  }

  async getOrderByUsername(username: string) {
    return await this.userService.findOrderByUsername(username);
  }

  async getOrderByOrderId(order_id: number, username: string) {
    return await this.orderRepository.findOne({
      select: {
        order_id: true,
        order_date: true,
        order_details: {
          order_detail_id: true,
          quantity: true,
          price: true,
          product: {
            product_id: true,
            name: true,
            description: true
          }
        }
      },
      relations: {
        order_details: {
          product: true
        }
      },
      where: {
        order_id,
        is_delete: false,
        order_details: {
          is_delete: false
        },
        user: {
          username
        }
      }
    });
  }

}
