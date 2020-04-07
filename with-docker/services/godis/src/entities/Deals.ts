import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Product, product => product.id)
  product: Product;
};
