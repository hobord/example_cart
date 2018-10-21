import { ICart } from "./ICart";
import { ICartLineFactory } from "./ICartLineFactory";
import { ICartLineStrategy } from "./ICartLineStrategy";

export interface ICartFactory {
  createCartById(id): ICart;
}

export abstract class AbstractCartFactory implements ICartFactory{
  constructor(
    public readonly cartLineFactory: ICartLineFactory,
    public readonly cartLineStrategy: ICartLineStrategy
    ) {}
  createCartById(id: any): ICart {
    throw new Error("Method not implemented.");
  }
}
