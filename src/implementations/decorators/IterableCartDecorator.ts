import { ICart } from "../../interfaces/ICart";
import { ICartIterable, ICartIteratorResult } from "../../interfaces/Iterable";
import { IImmutableCartLine } from "../../interfaces/IImmutableCartLine";
import { ICartItem } from "../../interfaces/ICartItem";
import { IItemQuantity } from "../../interfaces/IItemQuantity";

export class IterableCartDecorator implements ICart, ICartIterable {

  constructor(protected cart: ICart) {}
  
  protected iteratorIndex = 0;

  [Symbol.iterator]() {
    this.iteratorIndex = 0;
    return this;
  }

  next() {
    let result: ICartIteratorResult = { value: undefined, done: false };
    let cartLines: IImmutableCartLine[] = this.cart.getCartLines();
    if (this.iteratorIndex < cartLines.length) {
      result.value = cartLines[this.iteratorIndex];
      this.iteratorIndex++;
    } else {
      result.done = true;
    }
    return result;
  }

  getId(): string | number {
    return this.cart.getId()
  }
  addItem(cartItem: ICartItem): void {
    return this.cart.addItem(cartItem)
  }
  removeItem(cartItem: ICartItem): void {
    return this.cart.removeItem(cartItem)
  }
  getCartLines(): IImmutableCartLine[] {
    return this.cart.getCartLines()
  }
  getSumPrice(): number {
    return this.cart.getSumPrice()
  }
  getItemsIdWithQuantities(): IItemQuantity[] {
    return this.cart.getItemsIdWithQuantities()
  }
  getAssocItemIdsQuantities(): number[] {
    return this.cart.getAssocItemIdsQuantities();
  }
}
