import { ICartLineStrategy } from "../interfaces/ICartLineStrategy";
import { ICartLine } from "../interfaces/ICartLine";
import { ICartItem } from "../interfaces/ICartItem";
import { ICartLineFactory } from "../interfaces/ICartLineFactory";

export class SimpleUpdatePriceCartLineStrategy implements ICartLineStrategy {
  constructor(private cartLineFactory: ICartLineFactory) {}
  
  compare(cartLine: ICartLine, cartItem: ICartItem): boolean {
    return (cartLine.getItemID() === cartItem.getItemID());
  }

  addItem(cartLines: ICartLine[], cartItem: ICartItem): void {
    let found: boolean = false;
    for (let index = 0; index < cartLines.length; index++) {
      const element = cartLines[index];
      if (this.compare(element, cartItem)) {
        const newQuantity: number = cartItem.getQuantity() + element.getQuantity();
        element.setQuantity(newQuantity);
        element.setUnitPrice(cartItem.getUnitPrice());
        found = true;
        break;
      }
    }
    if (found === false) {
      let cartLine: ICartLine = this.cartLineFactory.create(cartItem);
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
