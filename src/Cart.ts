import {
  ICart,
  AbstractCartConstructor} from "./interfaces/ICart";
import { ICartIteratorResult } from "./interfaces/Iterable";
import { ICartLine } from "./interfaces/ICartLine";
import { IImmutableCartLine } from "./interfaces/IImmutableCartLine";
import { ICartItem } from "./interfaces/ICartItem";
import { IItemQuantity } from "./interfaces/IItemQuantity";
import { ImmutableCartLine } from "./implementations/ImmutableCartLine";
import { ItemQuantity } from "./implementations/ItemQuantity";

export class Cart extends AbstractCartConstructor implements ICart {
  protected cartLines: ICartLine[] = [];
  protected iteratorIndex = 0;
  protected observers: Observer[] = []; // TODO: make subjects

  getId(): string | number {
    return this.id;
  }

  /**
   * Add ICartItem item to cart
   * @param cartItem: ICartItem
   */
  addItem(cartItem: ICartItem): void {
    this.cartLineStrategy.addItem(this.cartLines, cartItem);
  }

  /**
   *
   * @param cartItem: ICartItem
   */
  removeItem(cartItem: ICartItem): void {
    this.cartLineStrategy.removeItem(this.cartLines, cartItem);
  }

  getCartLines(): IImmutableCartLine[] {
    let results: IImmutableCartLine[] = [];
    for (let index = 0; index < this.cartLines.length; index++) {
      const element = this.cartLines[index];
      results.push(
        new ImmutableCartLine(
          element.getItemID(),
          element.getQuantity(),
          element.getUnitPrice()
        )
      );
    }
    return results;
  }

  /**
   * Result sum of price of cart lines
   */
  getSumPrice(): number {
    let sumPrice = 0;
    for (let index = 0; index < this.cartLines.length; index++) {
      const element = this.cartLines[index];
      sumPrice += element.getUnitPrice() * element.getQuantity();
    }
    return sumPrice;
  }

  /**
   * Get quantities for each item (by itemId)
   * like: [ ItemQuantity { itemId: 'ewq34324', quantity: 2 }, ItemQuantity { itemId: '1sdasda', quantity: 4 } ]
   */
  getItemsIdWithQuantities(): IItemQuantity[] {
    let results: IItemQuantity[] = [];

    if (this.cartLines.length === 0) {
      return results;
    }

    let items: any = this.getAssocItemIdsQuantities();
    for (let key in items) {
      results.push(new ItemQuantity(key, items[key]));
    }

    return results;
  }

  /**
   * Get associative array of quantities with itemId's key
   * like: [ ewq34324: 2, 1sdasda: 4 ]
   */
  getAssocItemIdsQuantities(): number[] {
    let items: any = [];
    for (let index = 0; index < this.cartLines.length; index++) {
      const element = this.cartLines[index];
      if (items[element.getItemID()]) {
        items[element.getItemID()] += element.getQuantity();
      } else {
        items[element.getItemID()] = element.getQuantity();
      }
    }
    return items;
  }

  /**
   *  Make Iterable
   */
  [Symbol.iterator]() {
    // return new ArrayIterator(this.cartLines)
    this.iteratorIndex = 0;
    return this;
  }
  next() {
    let result: ICartIteratorResult = { value: undefined, done: false };
    let cartLines:IImmutableCartLine[] = this.getCartLines();
    if (this.iteratorIndex < cartLines.length) {
      result.value = cartLines[this.iteratorIndex];
      this.iteratorIndex++;
    } else {
      result.done = true;
    }
    return result;
  }

  /**
   * Make observable
   */
  register(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(): void {
    let i: number, max: number;

    for (i = 0, max = this.observers.length; i < max; i += 1) {
      this.observers[i].notify();
    }
  }
}
export class Observer {
  public notify(): void {
    throw new Error("Abstract Method!");
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
