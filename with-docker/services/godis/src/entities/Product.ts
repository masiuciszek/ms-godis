import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Producer } from './Producer';
import { OrderProduct } from './OrderProduct';
import { Deal } from './Deals';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double')
  qty: number;

  @Column('double')
  price: number;

  @ManyToOne(type => Producer, producer => producer.id)
  producer: Producer;

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.id)
  orderProduct: OrderProduct[];

  @OneToMany(type => Deal, deal => deal.id)
  deal: Deal[];
};
