import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductEntity } from "./models/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterProduct, UpdateProduct } from "./models/product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProductById(product_id: number) {
    return await this.productRepository.findOne({ where: { product_id } });
  }

  async saveProduct(product: RegisterProduct) {
    return await this.productRepository.save(product);
  }

  async updateProduct(product: UpdateProduct) {
    return await this.productRepository.update(product.product_id, product)
  }
}
