import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  qty: number;

  @Column('double')
  price: number;

  @ManyToOne(type => Order, order => order.id)
  order: Order;

  @ManyToOne(type => Product, product => product.id)
  product: Product;
}
