import { IImmutableCartLine } from "./IImmutableCartLine";
export interface ICartIterable {
  [Symbol.iterator](): Iterator<IImmutableCartLine | undefined>;
}
export interface ICartIterator {
  next(): ICartIteratorResult;
  return?(value?: any): ICartIteratorResult;
  throw?(e?: any): IteratorResult<ICartIteratorResult>;
}
export interface ICartIteratorResult {
  value: IImmutableCartLine | undefined;
  done: boolean;
}
