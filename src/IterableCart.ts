import { ICartIteratorResult, ICartIterable } from "./interfaces/Iterable";
import { IImmutableCartLine } from "./interfaces/IImmutableCartLine";
import { Cart } from "./Cart";

export class IterableCart extends Cart implements  ICartIterable {
  protected iteratorIndex = 0;

  [Symbol.iterator]() {
    // return new ArrayIterator(this.cartLines)
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

/*
class ArrayIterator {
  private index = 0

  constructor(private array: any[]) {} 
  
  next () {
    var result = { value: undefined, done: false }

    if (this.index < this.array.length) {
      result.value = this.array[this.index]
      this.index ++
    } else {
      result.done = true
    }

    return result
  }
}
*/
