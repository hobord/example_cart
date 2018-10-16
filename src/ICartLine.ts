export interface ICartLine {
  getItemID(): number | string

  getQuantity(): number 
  setQuantity(quantity: number): void

  getUnitPrice(): number
  setUnitPrice(price: number): void
}

export interface ICartLineFactory {
  create(item: ICartItem): ICartLine
}
export interface ICartItem {
  getItemID(): number | string
  getQuantity(): number
  getUnitPrice(): number
}

export interface IItemQuantity {
  getItemID(): number | string
  getQuantity(): number
}
