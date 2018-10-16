import { ICartLineStrategy } from "../interfaces/ICartLineStrategy";
import { ICartLine } from "../interfaces/ICartLine";
import { ICartItem } from "../interfaces/ICartItem";

export class MultiPriceCartLineStrategy implements ICartLineStrategy {
  compare(cartLine: ICartLine, cartItem: ICartItem): boolean {
    return (cartLine.getItemID() === cartItem.getItemID() && cartLine.getUnitPrice() === cartItem.getUnitPrice());
  }
}
