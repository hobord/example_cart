import { ICartFactory, AbstractCartFactory } from "../../interfaces/ICartFactory";
import { ICart } from "../../interfaces/ICart";
import { Cart } from "../../Cart";

export class CartFactory extends AbstractCartFactory implements ICartFactory {
  createCartById(id: any): ICart {
    return new Cart(id, this.cartLineFactory, this.cartLineStrategy);
  }
}
