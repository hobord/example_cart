import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { CartDbModel } from "./CartDbModel";
import { ICartItem } from "../../../interfaces/ICartItem";

@Entity('cart_line')
export class CartLineDbModel implements ICartItem {
  loadDataFromCartLine(cartLine: ICartItem): void {
    this.itemId = <number>cartLine.getItemID();
    this.quantity = cartLine.getQuantity();
    this.unitPrice = cartLine.getUnitPrice();
  }

  getItemID(): string | number {
    return this.itemId;
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
