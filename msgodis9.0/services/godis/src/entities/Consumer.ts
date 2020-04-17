import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  created_at: string;

  @Column({
    default: 'No first name'
  })
  firstName: string;

  @Column({
    default: 'No last name'
  })
  lastName: string;

  @Column({
    default: 'No address'
  })
  adress: string;

  @OneToMany(type => Order, order => order.id)
  order: Order[];
};
