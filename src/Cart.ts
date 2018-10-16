import { ICart, AbstractCartConstructor } from "./ICart";
import { ICartItem, ICartLine, ICartLineFactory } from "./ICartLine"

class CartLine implements ICartLine {
  constructor(
    protected itemId: number | string,
    protected quantity: number,
    protected price: number) {}
  getItemID(): string | number {
    return this.itemId
  }  
  getQuantity(): number {
    return this.quantity
  }
  setQuantity(quantity: number): void {
    this.quantity = quantity
  }
  getUnitPrice(): number {
    return this.price
  }
  setUnitPrice(price: number): void {
    this.price = price
  }
}

class factory implements ICartLineFactory {
  create(cartItem: ICartItem): ICartLine {
    return new CartLine(cartItem.getItemID(), cartItem.getQuantity(), cartItem.getUnitPrice())
  }

}

export class Cart extends AbstractCartConstructor implements ICart {
  protected _items: ICartLine[] = []
  protected static factory:ICartLineFactory = new factory()
  
  getId(): string | number {
    return this.id
  }
  /**
   * Add ICartItem item to cart
   * @param cartItem: ICartItem 
   */
  addItem(cartItem: ICartItem) {
    let found: boolean = false
    for (let index = 0; index < this._items.length; index++) {
      const element = this._items[index];
      if (element.getItemID() === cartItem.getItemID() && element.getUnitPrice() === cartItem.getUnitPrice()) {
        const newQuantity: number = cartItem.getQuantity() + element.getQuantity()
        element.setQuantity(newQuantity)
        found = true
        break;
      }
    }
    if (found === false) {
      let cartLine: ICartLine = Cart.factory.create(cartItem)
      this._items.push(cartLine)
    }
  }
}

