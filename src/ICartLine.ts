export interface ICartLine {
    getItemID(): number | string

    getQuantity(): number | string
    setQuantity(quantity: number | string): void

    getUnitPrice(): number | string
    setUnitPrice(price: number | string): void
}


export interface ICartItem {
    getItemID(): number | string
    getQuantity(): number | string
    getUnitPrice(): number | string
}

export interface IItemQuantity {
    getItemID(): number | string
    getQuantity(): number | string
}