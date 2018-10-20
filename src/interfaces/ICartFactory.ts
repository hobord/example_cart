import { ICart } from "./ICart";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";

export interface ICartFactory {
  createCartById(id): ICart;
}

export abstract class AbstractCartFactory {
  constructor(
    protected readonly cartLineFactory: ICartLineFactory,
    protected readonly cartLineStrategy: ICartLineStrategy
  ) {}
}
