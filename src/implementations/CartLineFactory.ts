import { ICartLine } from "../interfaces/ICartLine";
import { ICartItem } from "../interfaces/ICartItem";
import { ICartLineFactory } from "../interfaces/ICartLineFactory";
import { CartLine } from "../implementations/CartLine";

export class CartLineFactory implements ICartLineFactory {
  create(cartItem: ICartItem): ICartLine {
    return new CartLine(cartItem.getItemID(), cartItem.getQuantity(), cartItem.getUnitPrice());
  }
}
