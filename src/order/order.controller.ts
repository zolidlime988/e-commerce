import { Body, Controller, Delete, Get, Param, Post, Request } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrders } from "./models/order.dto";

@Controller("order")
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {
  }

  @Post()
  async createOrder(@Request() req, @Body() body: CreateOrders) {
    const username: string = req.username;
    return await this.orderService.createOrder(username, body.orders);
  }

  @Delete('/:order_id')
  async cancelOrder(@Request() req, @Param('order_id') order_id: number) {
    const username: string = req.username;
    return await this.orderService.cancelOrder(username, order_id);
  }

  @Get()
  async getOrders(@Request() req) {
    const username: string = req.username;
    return await this.orderService.getOrderByUsername(username)
  }

  @Get('/:order_id')
  async getOrderById(@Request() req, @Param('order_id') order_id: number) {
    const username: string = req.username;
    return await this.orderService.getOrderByOrderId(order_id, username)
  }
}
