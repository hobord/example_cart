import { ICartLine } from "./ICartLine";
import { ICartItem } from "./ICartItem";
export interface ICartLineStrategy {
  addItem(cartLines: ICartLine[], cartItem: ICartItem): void
  removeItem(cartLines: ICartLine[], cartItem: ICartItem): void
}
