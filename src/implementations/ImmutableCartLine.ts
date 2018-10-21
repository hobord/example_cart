import { ICartItem } from "../interfaces/ICartItem";

export class ImmutableCartLine implements ICartItem {
  constructor(
    protected readonly itemId: number | string,
    protected readonly quantity: number,
    protected readonly unitPrice: number
  ) {}
  getItemID(): string | number {
    return this.itemId;
  }
  getQuantity(): number {
    return this.quantity;
  }
  getUnitPrice(): number {
    return this.unitPrice;
  }
}
