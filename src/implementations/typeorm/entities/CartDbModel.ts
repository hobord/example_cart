import {Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { CartLineDbModel } from "./CartLineDbModel";

@Entity('cart')
export class CartDbModel {

  @PrimaryGeneratedColumn()
  id: number|null = null;

  @OneToMany(type => CartLineDbModel, line => line.cart)
  cartLines: CartLineDbModel[];
}
