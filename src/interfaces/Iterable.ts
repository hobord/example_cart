import { ICartItem } from ".";
export interface ICartIterable {
  [Symbol.iterator](): Iterator<ICartItem | undefined>;
}
export interface ICartIterator {
  next(): ICartIteratorResult;
  return?(value?: any): ICartIteratorResult;
  throw?(e?: any): IteratorResult<ICartIteratorResult>;
}
export interface ICartIteratorResult {
  value: ICartItem | undefined;
  done: boolean;
}
