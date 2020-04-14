import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Producer } from './Producer';
import { OrderProduct } from './OrderProduct';
import { Deal } from './Deals';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  created_at: string;

  @Column({
    default: 'No name'
  })
  name: string;

  @Column({
    type: 'double',
    default: 0
  })
  qty: number;

  @Column({
    type: 'double',
    default: 0
  })
  price: number;

  @ManyToOne(type => Producer, producer => producer.id)
  producer: Producer;

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.id)
  orderProduct: OrderProduct[];

  @OneToMany(type => Deal, deal => deal.id)
  deal: Deal[];
};
