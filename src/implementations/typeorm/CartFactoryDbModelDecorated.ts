import { ICartFactory } from "../../interfaces/ICartFactory";
import { ICart } from "../../interfaces/ICart";
import { CartDbModel } from "./entities/CartDbModel";

export class CartFactoryDbModelDecorated implements ICartFactory {
  constructor(protected cartFactory: ICartFactory) {}

  createCartById(id: any): ICart {
    return this.cartFactory.createCartById(id)
  }

  createCartFromModel(cartDbModel: CartDbModel): ICart {
    const cart: ICart = this.cartFactory.createCartById(cartDbModel.id);
    if(cartDbModel.cartLines) {
      for (let index = 0; index < cartDbModel.cartLines.length; index++) {
        const cartLineDbModel = cartDbModel.cartLines[index];
        cart.addItem(cartLineDbModel);
      }
    }
    return cart;
  }
}
