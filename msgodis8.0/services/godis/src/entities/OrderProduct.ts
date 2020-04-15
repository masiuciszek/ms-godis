import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  created_at: string;

  @Column({
    type: 'double',
    default: 0,
  })
  qty: number;

  @Column({
    type: 'double',
    default: 0,
  })
  price: number;

  @ManyToOne(type => Order, order => order.id)
  order: Order;

  @ManyToOne(type => Product, product => product.id)
  product: Product;
}
