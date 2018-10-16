import { ICartLine } from "./ICartLine";
import { ICartItem } from "./ICartItem";
export interface ICartLineFactory {
  create(item: ICartItem): ICartLine;
}
