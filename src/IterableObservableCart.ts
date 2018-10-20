import { ICartIteratorResult, ICartIterable } from "./interfaces/Iterable";
import { IImmutableCartLine } from "./interfaces/IImmutableCartLine";
import { ObservableCart } from "./ObservableCart";

export class IterableObservableCart extends ObservableCart implements ICartIterable {
  protected iteratorIndex = 0;

  [Symbol.iterator]() {
    this.iteratorIndex = 0;
    return this;
  }

  next() {
    let result: ICartIteratorResult = { value: undefined, done: false };
    let cartLines: IImmutableCartLine[] = this.getCartLines();
    if (this.iteratorIndex < cartLines.length) {
      result.value = cartLines[this.iteratorIndex];
      this.iteratorIndex++;
    } else {
      result.done = true;
    }
    return result;
  }
}

