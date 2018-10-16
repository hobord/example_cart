import { ICartItem } from "./ICartLine";

export interface ICart {
  getId(): number | string
  addItem(cartItem: ICartItem)
}

export abstract class AbstractCartConstructor {
  constructor(protected readonly id: number | string) {}
}
