import { ICartItemRepository } from "./ICartItemRepository";

export interface ICart {
    getId(): number | string
}

export abstract class AbstractCartConstructor {
    constructor(protected readonly id: number | string,
        private readonly repository: ICartItemRepository) {}
}