import { CartLineDbModel } from "./entities/CartLineDbModel";
import { ICartItem } from "../../interfaces";

export class CartLineDbModelFactory {

  protected setCartId(cartLineDbModel, cartId) {
    cartLineDbModel.cartId = cartId;
    return cartLineDbModel;
  }
  
  protected fillWithCartLine(cartLineDbModel, cartLine: ICartItem) {
    cartLineDbModel.itemId = <number>cartLine.getItemID();
    cartLineDbModel.quantity = cartLine.getQuantity();
    cartLineDbModel.unitPrice = cartLine.getUnitPrice();
    return cartLineDbModel;
  }

  create() {
    return new CartLineDbModel();
  }

  createWithCartId(cartId) {
    let cartLineDbModel = this.create();
    return this.setCartId(cartLineDbModel, cartId);
  }

  createFromCartLine(cartLine: ICartItem) {
    const cartLineDbModel = this.create();
    return this.fillWithCartLine(cartLineDbModel, cartLine);
  }

  createWithCartIdFromCartLine(cartId, cartLine) {
    let cartLineDbModel = this.createWithCartId(cartId);
    return this.fillWithCartLine(cartLineDbModel, cartLine);
  }
}
