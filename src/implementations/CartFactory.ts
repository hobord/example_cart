import { ICartFactory } from "../interfaces/ICartFactory";
import { ICart } from "../interfaces/ICart";
import { Cart } from "../Cart";
import { ICartLineFactory } from "../interfaces/ICartLineFactory";
import { ICartLineStrategy } from "../interfaces/ICartLineStrategy";

export class CartFactory implements ICartFactory {
  constructor(
    private readonly cartLineFactory: ICartLineFactory,
    private readonly cartLineStrategy: ICartLineStrategy
  ) {}
  createCartById(id: any): ICart {
    return new Cart(id, this.cartLineFactory, this.cartLineStrategy);
  }
}
