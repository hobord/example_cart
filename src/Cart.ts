import { ICart, AbstractCartConstructor } from "./interfaces/ICart";
import { ICartLine } from "./interfaces/ICartLine"
import { ICartItem } from "./interfaces/ICartItem";

export class Cart extends AbstractCartConstructor implements ICart {
  protected items: ICartLine[] = []
  private iteratorIndex = 0

  getId(): string | number {
    return this.id
  }
  /**
   * Add ICartItem item to cart
   * @param cartItem: ICartItem 
   */
  addItem(cartItem: ICartItem): void {
    let found: boolean = false
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (this._cartLineStrategy.compare(element, cartItem)) {
        const newQuantity: number = cartItem.getQuantity() + element.getQuantity()
        element.setQuantity(newQuantity)
        found = true
        break
      }
    }
    if (found === false) {
      let cartLine: ICartLine = this._cartLineFactory.create(cartItem)
      this.items.push(cartLine)
    }
  }

  removeItem(cartItem: ICartItem): void {
    let found: boolean = false
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (this._cartLineStrategy.compare(element, cartItem)) {
        const newQuantity: number = cartItem.getQuantity() - element.getQuantity()
        if (newQuantity<1) {
          this.items.splice(index, 1);
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
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      sumPrice += element.getUnitPrice() * element.getQuantity()
    }
    return sumPrice
  }

  [Symbol.iterator] () {
    // return new ArrayIterator(this.items)
    this.iteratorIndex = 0
    return this
  }
  next () {
    let result: { 
      value: ICartLine|undefined,
      done: boolean
    } = { 
      value: undefined,
      done: false
    }

    if (this.iteratorIndex < this.items.length) {
      result.value = this.items[this.iteratorIndex]
      this.iteratorIndex ++
    } else {
      result.done = true
    }
    return result
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
