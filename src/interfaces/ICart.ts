import { ICartItem } from "./ICartItem";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";
import { IItemQuantity } from "./IItemQuantity";

export interface ICart {
  getId(): number | string;
  addItem(cartItem: ICartItem): void;
  removeItem(cartItem: ICartItem): void;
  getCartLines(): ICartItem[];
  getSumPrice(): number;
  getItemsIdWithQuantities(): IItemQuantity[];
  getAssocItemIdsQuantities(): number[];
}

export abstract class AbstractCartConstructor {
  constructor(
    protected readonly id: number | string,
    protected cartLineFactory: ICartLineFactory,
    protected cartLineStrategy: ICartLineStrategy
  ) {}
}
