import { ICartLine } from "../interfaces/ICartLine";
import { ICartItem } from "../interfaces/ICartItem";
import { ICartLineFactory } from "../interfaces/ICartLineFactory";
import { CartLine } from "../implementations/CartLine";

/**
 * CartLine factory
 *
 * @export
 * @class CartLineFactory
 * @implements {ICartLineFactory}
 */
export class CartLineFactory implements ICartLineFactory {
  /**
   * Create a CartLine from CartItem
   *
   * @param {ICartItem} cartItem
   * @returns {ICartLine}
   * @memberof CartLineFactory
   */
  create(cartItem: ICartItem): ICartLine {
    return new CartLine(cartItem.getItemID(), cartItem.getQuantity(), cartItem.getUnitPrice());
  }
}
