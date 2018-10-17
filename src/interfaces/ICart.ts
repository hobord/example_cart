import { ICartItem } from "./ICartItem";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";
import { ICartLine } from "./ICartLine";
import { IItemQuantity } from "./IItemQuantity";

export interface ICart extends Iterable {
  getId(): number | string;
  addItem(cartItem: ICartItem): void;
  removeItem(cartItem: ICartItem): void;
  getCartLines(): ICartLine[];
  getSumPrice(): number;
  getItemsIdWithQuantities(): IItemQuantity[];
  getAssocItemIdsQuantities(): number[];
}

export abstract class AbstractCartConstructor {
  constructor(
    protected readonly id: number | string,
    protected cartLineFactory: ICartLineFactory,
    protected cartLineStrategy: ICartLineStrategy
  ) {}
}

export interface Iterable {
  [Symbol.iterator](): Iterator<ICartLine | undefined>;
}

export interface ICartIterator {
  next(): ICartIteratorResult;
  return?(value?: any): ICartIteratorResult;
  throw?(e?: any): IteratorResult<ICartIteratorResult>;
}

export interface ICartIteratorResult {
  value: ICartLine | undefined;
  done: boolean;
}
