import { ICartLine } from "../interfaces/ICartLine";
import { AbstractCartLine } from "./AbstractCartLine";

/**
 * Represent a cart's record.
 * The itemId is immutable.
 *
 * @export
 * @class CartLine
 * @extends {AbstractCartLine}
 * @implements {ICartLine}
 */
export class CartLine extends AbstractCartLine implements ICartLine {
  /**
   * Get item id of this CartLine
   *
   * @returns {(string | number)}
   * @memberof CartLine
   */
  getItemID(): string | number {
    return this.itemId;
  }
  /**
   * Get quantity of item in this CartLine
   *
   * @returns {number}
   * @memberof CartLine
   */
  getQuantity(): number {
    return this.quantity;
  }
  /**
   * Set quantity of item in this CartLine
   *
   * @param {number} quantity
   * @memberof CartLine
   */
  setQuantity(quantity: number): void {
    if (quantity > 0) {
      this.quantity = quantity;
    }
  }
  /**
   * Get unit price of item in this CartLine
   *
   * @returns {number}
   * @memberof CartLine
   */
  getUnitPrice(): number {
    return this.price;
  }
  /**
   * Set unit price of item in this CartLine
   *
   * @param {number} price
   * @memberof CartLine
   */
  setUnitPrice(price: number): void {
    this.price = price;
  }
}
