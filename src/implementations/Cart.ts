import { ICart, AbstractCartConstructor } from "../interfaces/ICart";
import { ICartLine } from "../interfaces/ICartLine";
import { ICartItem } from "../interfaces/ICartItem";
import { IItemQuantity } from "../interfaces/IItemQuantity";
import { ImmutableCartLine } from "./ImmutableCartLine";
import { ItemQuantity } from "./ItemQuantity";

export class Cart extends AbstractCartConstructor implements ICart {
  protected cartLines: ICartLine[] = [];

  /**
   * Return this cart's id
   *
   * @returns {(string | number)}
   * @memberof Cart
   */
  getId(): string | number {
    return this.id;
  }

  /**
   * Add ICartItem item to cart by injected strategy.
   *
   * @param {ICartItem} cartItem
   * @memberof Cart
   */
  addItem(cartItem: ICartItem): void {
    this.cartLineStrategy.addItem(this.cartLines, cartItem);
  }

  /**
   * Remove cartItem from cart line by injected strategy.
   *
   * @param {ICartItem} cartItem
   * @memberof Cart
   */
  removeItem(cartItem: ICartItem): void {
    this.cartLineStrategy.removeItem(this.cartLines, cartItem);
  }

  /**
   * Get immutable cart lines
   *
   * @returns {ICartItem[]}
   * @memberof Cart
   */
  getCartLines(): ICartItem[] {
    let results: ICartItem[] = [];
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
   *
   * @returns {number}
   * @memberof Cart
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
   *
   * @returns {IItemQuantity[]}
   * @memberof Cart
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
   *
   * @returns {number[]}
   * @memberof Cart
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
}

