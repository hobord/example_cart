import { ICart, AbstractCartConstructor } from "./interfaces/ICart";
import { ICartLine } from "./interfaces/ICartLine"
import { ICartItem } from "./interfaces/ICartItem";

export class Cart extends AbstractCartConstructor implements ICart {
  protected _items: ICartLine[] = []
  
  getId(): string | number {
    return this.id
  }
  /**
   * Add ICartItem item to cart
   * @param cartItem: ICartItem 
   */
  addItem(cartItem: ICartItem): void {
    let found: boolean = false
    for (let index = 0; index < this._items.length; index++) {
      const element = this._items[index];
      if (this._cartLineStrategy.compare(element, cartItem)) {
        const newQuantity: number = cartItem.getQuantity() + element.getQuantity()
        element.setQuantity(newQuantity)
        found = true
        break
      }
    }
    if (found === false) {
      let cartLine: ICartLine = this._cartLineFactory.create(cartItem)
      this._items.push(cartLine)
    }
  }

  removeItem(cartItem: ICartItem): void {
    let found: boolean = false
    for (let index = 0; index < this._items.length; index++) {
      const element = this._items[index];
      if (this._cartLineStrategy.compare(element, cartItem)) {
        const newQuantity: number = cartItem.getQuantity() - element.getQuantity()
        if (newQuantity<1) {
          this._items.splice(index, 1);
        } else {
          element.setQuantity(newQuantity)
        }
        found = true
        break
      }
    }
    if (found === false) {
      // TODO: drop exception?
    }
  }

  getSumPrice(): number {
    let sumPrice = 0
    for (let index = 0; index < this._items.length; index++) {
      const element = this._items[index];
      sumPrice += element.getUnitPrice() * element.getQuantity()
    }
    return sumPrice
  }
}

