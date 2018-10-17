import { ICartItem } from "./ICartItem";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";
import { IImmutableCartLine } from "./IImmutableCartLine";
import { IItemQuantity } from "./IItemQuantity";
import { ICartIterable } from "./Iterable";

export interface ICart extends ICartIterable {
  getId(): number | string;
  addItem(cartItem: ICartItem): void;
  removeItem(cartItem: ICartItem): void;
  getCartLines(): IImmutableCartLine[];
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
