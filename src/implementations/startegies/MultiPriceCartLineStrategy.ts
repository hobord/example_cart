import { ICartLineStrategy } from "../../interfaces/ICartLineStrategy";
import { ICartLine } from "../../interfaces/ICartLine";
import { ICartItem } from "../../interfaces/ICartItem";
import { ICartLineFactory } from "../../interfaces/ICartLineFactory";

/**
 * This Strategy allow multiple CartLine with same itemId but different price
 *
 * @export
 * @class MultiPriceCartLineStrategy
 * @implements {ICartLineStrategy}
 */
export class MultiPriceCartLineStrategy implements ICartLineStrategy {
  constructor(private cartLineFactory: ICartLineFactory) {}

  compare(cartLine: ICartLine, cartItem: ICartItem): boolean {
    return (cartLine.getItemID() === cartItem.getItemID() && cartLine.getUnitPrice() === cartItem.getUnitPrice());
  }

  addItem(cartLines: ICartLine[], cartItem: ICartItem): void {
    let found: boolean = false;
    for (let index = 0; index < cartLines.length; index++) {
      const element = cartLines[index];
      if (this.compare(element, cartItem)) {
        const newQuantity: number = cartItem.getQuantity() + element.getQuantity();
        element.setQuantity(newQuantity);
        found = true;
        break;
      }
    }
    if (found === false) {
      let cartLine: ICartLine = this.cartLineFactory.createFromItem(cartItem);
      cartLines.push(cartLine);
    }
  }

  removeItem(cartLines: ICartLine[], cartItem: ICartItem): void {
    let found: boolean = false;
    for (let index = 0; index < cartLines.length; index++) {
      const element = cartLines[index];
      if (this.compare(element, cartItem)) {
        const newQuantity: number = cartItem.getQuantity() - element.getQuantity();
        if (newQuantity < 1) {
          cartLines.splice(index, 1);
        } else {
          element.setQuantity(newQuantity);
        }
        found = true;
        break;
      }
    }
    if (found === false) {
      // TODO: drop exception?
    }
  }
}
