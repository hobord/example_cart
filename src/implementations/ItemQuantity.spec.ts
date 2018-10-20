import { expect } from "chai";
import "mocha";
import * as faker from "faker";
import { ItemQuantity } from "./ItemQuantity";


describe("ItemQuantity", () => {
  let itemQuantity: ItemQuantity;

  beforeEach(function () {
    
  });
  it("Getter should be return with construction values", () => {
    let itemId, quantity: number;
    itemId = faker.random.number()
    quantity = faker.random.number();
    itemQuantity = new ItemQuantity(itemId, quantity)

    expect(itemQuantity.getItemID()).be.eq(itemId);
    expect(itemQuantity.getQuantity()).be.eq(quantity);
    
  })
});
