import { ProductEntity } from "src/product/models/product.entity";
import { UserEntity } from "src/user/models/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => UserEntity, (user) => user.orders,  { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  order_details: OrderDetailEntity[];

  @CreateDateColumn()
  order_date: Date;

  @Column({ default: false, select: false })
  is_delete: boolean;
}

@Entity()
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  order_detail_id: number;

  @ManyToOne(() => OrderEntity, (order) => order.order_details,  { onDelete: 'CASCADE' })
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => ProductEntity,  { onDelete: 'CASCADE' })
  @JoinColumn()
  product: ProductEntity;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  price: number;

  @Column({ default: false, select: false })
  is_delete: boolean;
}
