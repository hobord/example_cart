import { ICart } from "./ICart";

export interface ICartRepository {
  getById(cartId: number|string): Promise<ICart> 
  create(): Promise<ICart>
  save(cart: ICart): Promise<ICart>
}
