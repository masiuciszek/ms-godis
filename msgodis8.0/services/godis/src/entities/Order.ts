import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column } from 'typeorm';
import { Consumer } from './Consumer';
import { OrderProduct } from './OrderProduct';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  created_at: string;

  @Column({
    type: 'double',
    default: 0
  })
  total: number;

  @ManyToOne(type => Consumer, consumer => consumer.id)
  consumer: Consumer;

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.order)
  orderProduct: OrderProduct[];
}
