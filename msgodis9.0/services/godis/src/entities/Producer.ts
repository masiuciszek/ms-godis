import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Producer {
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

  @OneToMany(type => Product, product => product.producer)
  product: Product[];
};
