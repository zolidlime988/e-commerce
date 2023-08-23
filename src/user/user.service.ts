import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUser } from './models/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {

    }

    async save(user: RegisterUser) {
        return await this.userRepository.save(user);
    }

    async findUserByUsername(username: string) {
        return await this.userRepository.findOne({ where: { username } });
    }

    async findUserByKeyword(keyword: string, value: string) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where(`user.${keyword}= :value`, { value })
            .getExists();
    }

    async findOrderByUsername(username: string) {
        return await this.userRepository.findOne({
            select: {
                user_id: true,
                username: true,
                email: true,
                mobile_no: true,
                nat_id: true,
                register_date: true,
                orders: {
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
                }
            },
            relations: {
                orders: {
                    order_details: {
                        product: true
                    }
                }
            },
            where: {
                username,
                orders: {
                    is_delete: false,
                    order_details: {
                        is_delete: false
                    }
                }
            }
        })
    }
}
