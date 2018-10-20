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
export abstract class AbstractCartLine {
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
}
