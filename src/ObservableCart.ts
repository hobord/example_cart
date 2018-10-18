import { ICartItem } from "./interfaces/ICartItem";
import { Cart } from "./Cart";

interface ISubject {
  [key: string]: Subject;
}

export class ObservableCart extends Cart {

  // TODO: Interface / refactor
  protected subjects: ISubject = {
    updated: new Subject(),
    itemAdded: new Subject(),
    itemRemoved: new Subject(),
    cartBeforeSave: new Subject(),
    cartSaved: new Subject()
  };

  // TODO: Interface / refactor
  getEventsNames(): string[] {
    return Object.keys(this.subjects);
  }
  getSubject(name: string): Subject {
    return this.subjects[name];
  }
  // TODO: Interface / refactor
  registerToEvent(event: string, observer: Observer) {
    if (event in this.subjects) {
      this.subjects[event].register(observer);
    }
  }

  /**
   * Add ICartItem item to cart by injected strategy.
   *
   * @param {ICartItem} cartItem
   * @memberof Cart
   */
  addItem(cartItem: ICartItem): void {
    super.addItem(cartItem);
    this.subjects.updated.notify();
    this.subjects.itemAdded.notify();
  }

  /**
   * Remove cartItem from cart line by injected strategy.
   *
   * @param {ICartItem} cartItem
   * @memberof Cart
   */
  removeItem(cartItem: ICartItem): void {
    super.removeItem(cartItem);
    this.subjects.updated.notify();
    this.subjects.itemRemoved.notify();
  }

  }

class Subject {
  private observers: Observer[] = [];
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