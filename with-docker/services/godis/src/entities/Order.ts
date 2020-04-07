import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Consumer } from './Consumer';
import { OrderProduct } from './OrderProduct';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Consumer, consumer => consumer.id)
  consumer: Consumer;

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.order)
  orderProduct: OrderProduct[];
}
