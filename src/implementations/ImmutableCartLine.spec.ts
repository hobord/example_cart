import { expect } from "chai";
import "mocha";
import * as faker from "faker";
import { ImmutableCartLine } from "./ImmutableCartLine";


describe("ImmutableCartLine", () => {
  let immutableCartLine: ImmutableCartLine;

  beforeEach(function () {
    
  });
  
  it("Getter should be return with construction values", () => {
    let itemId, quantity, unitPrice: number;
    itemId = faker.random.number()
    quantity = faker.random.number();
    unitPrice = faker.random.number();

    immutableCartLine = new ImmutableCartLine(itemId, quantity, unitPrice);

    expect(immutableCartLine.getItemID()).be.eq(itemId);
    expect(immutableCartLine.getQuantity()).be.eq(quantity);
    expect(immutableCartLine.getUnitPrice()).be.eq(unitPrice);
    
  })
});
