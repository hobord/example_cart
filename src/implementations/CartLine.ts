import { ICartLine } from "../interfaces/ICartLine";

export class CartLine implements ICartLine {
  constructor(protected itemId: number | string, protected quantity: number, protected price: number) { }
  getItemID(): string | number {
    return this.itemId;
  }
  getQuantity(): number {
    return this.quantity;
  }
  setQuantity(quantity: number): void {
    if(quantity>0) {
      this.quantity = quantity;
    }
  }
  getUnitPrice(): number {
    return this.price;
  }
  setUnitPrice(price: number): void {
    this.price = price;
  }
}
