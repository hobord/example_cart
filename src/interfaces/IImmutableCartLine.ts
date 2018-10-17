export interface IImmutableCartLine {
  getItemID(): number | string;
  getQuantity(): number;
  getUnitPrice(): number;
}
