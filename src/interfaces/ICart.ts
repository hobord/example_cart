import { ICartItem } from "./ICartItem";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";
import { ICartLine } from "./ICartLine";

export interface ICart extends Iterable {
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


interface Iterable {
  [Symbol.iterator](): Iterator<ICartLine|undefined>
}

interface ICartIterator {
  next() : ICartIteratorResult;
  return?(value? : any) : ICartIteratorResult;
}

export interface ICartIteratorResult {
  value : ICartLine|undefined;
  done : boolean;
}
