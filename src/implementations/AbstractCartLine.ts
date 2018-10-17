import { ICartLine } from "../interfaces/ICartLine";

/**
 * Abstract class represent a cart's record.
 * The itemId is immutable. 
 *
 * @export
 * @abstract
 * @class AbstractCartLine
 * @implements {ICartLine}
 */
export abstract class AbstractCartLine implements ICartLine {
  /**
   * Creates an instance of CartLine.
   * @param {(number | string)} itemId
   * @param {number} quantity
   * @param {number} price
   */
  constructor(
    protected itemId: number | string,
    protected quantity: number,
    protected price: number
  ) {}
  getItemID(): string | number {
    throw new Error("Method not implemented.");
  }
  getQuantity(): number {
    throw new Error("Method not implemented.");
  }
  setQuantity(quantity: number): void {
    throw new Error("Method not implemented.");
  }
  getUnitPrice(): number {
    throw new Error("Method not implemented.");
  }
  setUnitPrice(price: number): void {
    throw new Error("Method not implemented.");
  }
}
