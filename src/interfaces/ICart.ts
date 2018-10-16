import { ICartItem } from "./ICartItem";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";

export interface ICart {
  getId(): number | string
  addItem(cartItem: ICartItem): void
  removeItem(cartItem: ICartItem): void
  getSumPrice(): number
}

export abstract class AbstractCartConstructor {
  constructor(protected readonly id: number | string,
  protected _cartLineFactory: ICartLineFactory,
  protected _cartLineStrategy: ICartLineStrategy) {}
}
