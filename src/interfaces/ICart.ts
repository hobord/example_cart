import { ICartItem } from "./ICartItem";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";
import { ICartLine } from "./ICartLine";

export interface ICart {
  [Symbol.iterator](): Iterator<any>
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

/*
interface Iterable {
  [Symbol.iterator](): Iterator
}
interface Iterator {
  next() : IteratorResult;
  return?(value? : any) : IteratorResult;
}
interface IteratorResult {
  value : ICartLine|null|undefined;
  done : boolean;
}
*/
