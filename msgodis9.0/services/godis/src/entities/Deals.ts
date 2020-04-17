import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Producer } from './Producer';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Product, product => product.id)
  product: Product;

  @ManyToOne(type => Producer, producer => producer.id)
  producer: Producer;

  @Column({
    type: 'date',
    default: () => 'CURDATE()'
  })
  valid_from: string;

  @Column({
    type: 'date',
    default: () => 'DATE_ADD(CURDATE(), INTERVAL 7 DAY)'
  })
  valid_to: string;
};
