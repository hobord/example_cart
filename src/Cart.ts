import { ICart, AbstractCartConstructor } from "./ICart";
import { ICartItemRepository } from "./ICartItemRepository";

export class Cart extends AbstractCartConstructor implements ICart {
    getId(): string | number {
        return this.id
    }
}

