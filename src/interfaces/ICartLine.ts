export interface ICartLine {
  getItemID(): number | string

  getQuantity(): number 
  setQuantity(quantity: number): void

  getUnitPrice(): number
  setUnitPrice(price: number): void
}

