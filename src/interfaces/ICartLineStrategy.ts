import { ICartLine } from "./ICartLine";
import { ICartItem } from "./ICartItem";
export interface ICartLineStrategy {
  compare(cartLine: ICartLine, cartItem: ICartItem): boolean;
}
