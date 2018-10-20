import { ICartLine } from "./ICartLine";
import { ICartItem } from "./ICartItem";
export interface ICartLineFactory {
  createFromItem(item: ICartItem): ICartLine;
}
