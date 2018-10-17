import { IItemQuantity } from "../interfaces/IItemQuantity";
export class ItemQuantity implements IItemQuantity {
  constructor(private itemId: number | string, private quantity: number) { }
  getItemID(): string | number {
    return this.itemId;
  }
  getQuantity(): number {
    return this.quantity;
  }
}
