export interface ICartLine {
  getItemID(): number | string

  getQuantity(): number 
  setQuantity(quantity: number): void

  getUnitPrice(): number
  setUnitPrice(price: number): void
}

export interface IImmutableCartLine {
  getItemID(): number | string
  getQuantity(): number
  getUnitPrice(): number
}

