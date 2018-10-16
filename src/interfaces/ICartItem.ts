export interface ICartItem {
  getItemID(): number | string;
  getQuantity(): number;
  getUnitPrice(): number;
}
