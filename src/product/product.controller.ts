import { Body, Controller, Get, Param, Post, Put, Request } from "@nestjs/common";
import { ProductService } from "./product.service";
import { RegisterProduct, UpdateProduct } from "./models/product.dto";

@Controller("product")
export class ProductController {

  constructor(
    private productService: ProductService
  ) {
  }

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get('/:product_id')
  async getProductById(@Param('product_id') product_id: number) {
    return await this.productService.getProductById(product_id);
  }

  @Post()
  async saveProduct(@Request() req: any, @Body() body: RegisterProduct) {
    return await this.productService.saveProduct(body);
  }

  @Put()
  async updateProduct(@Request() req: any, @Body() body: UpdateProduct) {
    return await this.productService.updateProduct(body);
  }
}
