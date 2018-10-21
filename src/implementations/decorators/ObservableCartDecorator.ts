import { ICartItem } from "../../interfaces/ICartItem";
import { ICart } from "../../interfaces/ICart";
import { IItemQuantity } from "../../interfaces/IItemQuantity";

export interface Observable {
  register(observer: Observer);
  unregister(observer: Observer);
  notify();
}

export class ObservableCartDecorator implements ICart, Observable {
  protected subject: Subject;

  constructor(protected cart: ICart) {
    this.subject = new Subject();
  }

  register(observer: Observer) {
    this.subject.register(observer);
  }
  unregister(observer: Observer) {
    this.subject.unregister(observer);
  }
  notify() {
    this.subject.notify();
  }

  getId(): string | number {
    return this.cart.getId();
  }
  getCartLines(): ICartItem[] {
    return this.cart.getCartLines();
  }
  getSumPrice(): number {
    return this.cart.getSumPrice();
  }
  getItemsIdWithQuantities(): IItemQuantity[] {
    return this.cart.getItemsIdWithQuantities();
  }
  getAssocItemIdsQuantities(): number[] {
    return this.cart.getAssocItemIdsQuantities();
  }

  /**
   * Add ICartItem item to cart by injected strategy.
   *
   * @param {ICartItem} cartItem
   * @memberof Cart
   */
  addItem(cartItem: ICartItem): void {
    this.cart.addItem(cartItem);
    this.subject.notify();
  }

  /**
   * Remove cartItem from cart line by injected strategy.
   *
   * @param {ICartItem} cartItem
   * @memberof Cart
   */
  removeItem(cartItem: ICartItem): void {
    this.cart.removeItem(cartItem);
    this.subject.notify();
  }
}

class Subject {
  private observers: Observer[] = [];

  register(observer: Observer): void {
    this.observers.push(observer);
  }

  unregister(observer: Observer): void {
    var n: number = this.observers.indexOf(observer);
    console.log(observer, "is removed");
    this.observers.splice(n, 1);
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
