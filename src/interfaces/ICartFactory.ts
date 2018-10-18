import { ICart } from "./ICart";

export interface ICartFactory {
  createCartById(id): ICart
}
