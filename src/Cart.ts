import {
  ICart,
  AbstractCartConstructor,
  ICartIteratorResult
} from "./interfaces/ICart";
import {
  ICartLine
} from "./interfaces/ICartLine"
import {
  ICartItem
} from "./interfaces/ICartItem";

export class Cart extends AbstractCartConstructor implements ICart {
  protected cartLines: ICartLine[] = [];
  private iteratorIndex = 0;

  getId(): string | number {
    return this.id;
  }

  /**
   * Add ICartItem item to cart
   * @param cartItem: ICartItem
   */
  addItem(cartItem: ICartItem): void {
    this.cartLineStrategy.addItem(this.cartLines, cartItem)
  }

  /**
   *
   * @param cartItem: ICartItem
   */
  removeItem(cartItem: ICartItem): void {
    this.cartLineStrategy.removeItem(this.cartLines, cartItem)
  }

  /**
   * 
   */
  getSumPrice(): number {
    let sumPrice = 0;
    for (let index = 0; index < this.cartLines.length; index++) {
      const element = this.cartLines[index];
      sumPrice += element.getUnitPrice() * element.getQuantity();
    }
    return sumPrice;
  }

  // Make Iterable
  [Symbol.iterator]() {
    // return new ArrayIterator(this.cartLines)
    this.iteratorIndex = 0;
    return this;
  }
  next() {
    let result: ICartIteratorResult = {
      value: undefined,
      done: false
    };

    if (this.iteratorIndex < this.cartLines.length) {
      result.value = this.cartLines[this.iteratorIndex];
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
