import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { CartDbModel } from "./CartDbModel";
import { ICartItem } from "../../interfaces/ICartItem";

@Entity()
export class CartLineDbModel implements ICartItem{
  getItemID(): string | number {
    return this.id;
  }
  getQuantity(): number {
    return this.quantity;
  }
  getUnitPrice(): number {
    return this.unitPrice;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartId: number;
  
  @Column()
  itemId: number;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @ManyToOne(type => CartDbModel, cart => cart.cartLines)
  cart: CartDbModel;
}
