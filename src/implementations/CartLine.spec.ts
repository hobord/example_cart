import { expect } from "chai";
import "mocha";
import * as faker from "faker";
import { CartLine } from "./CartLine";


describe("CartLine", () => {
  let itemId, quantity, unitPrice: number;
  let cartLine: CartLine;

  beforeEach(function () {
    let itemId, quantity, unitPrice: number;
    itemId = faker.random.number();
    quantity = faker.random.number();
    unitPrice = faker.random.number();
  });
  
  it("Getter should be return with construction values", () => {
    cartLine = new CartLine(itemId, quantity, unitPrice);

    expect(cartLine.getItemID()).be.eq(itemId);
    expect(cartLine.getQuantity()).be.eq(quantity);
    expect(cartLine.getUnitPrice()).be.eq(unitPrice);
    
  })

  it('set quantity', () => {
    cartLine = new CartLine(itemId, quantity, unitPrice);

    const newQuantity = faker.random.number();
    cartLine.setQuantity(newQuantity);
    
    expect(cartLine.getQuantity()).be.not.eq(quantity);
    expect(cartLine.getQuantity()).be.eq(newQuantity);
  })

  it('set quantity 0', () => {
    cartLine = new CartLine(itemId, quantity, unitPrice);
    
    const newQuantity = 0;
    cartLine.setQuantity(newQuantity);
    
    expect(cartLine.getQuantity()).be.not.eq(newQuantity);
    expect(cartLine.getQuantity()).be.eq(quantity);
  })

  it('set quantity negative', () => {
    cartLine = new CartLine(itemId, quantity, unitPrice);

    const newQuantity = faker.random.number() * -1;
    cartLine.setQuantity(newQuantity);

    expect(cartLine.getQuantity()).be.not.eq(newQuantity);
    expect(cartLine.getQuantity()).be.eq(quantity);
  })

  it('set price', () => {
    cartLine = new CartLine(itemId, quantity, unitPrice);

    const newUnitPrice = faker.random.number();
    cartLine.setUnitPrice(newUnitPrice);

    expect(cartLine.getUnitPrice()).be.not.eq(unitPrice);
    expect(cartLine.getUnitPrice()).be.eq(newUnitPrice);
  })

  it('set price 0', () => {
    cartLine = new CartLine(itemId, quantity, unitPrice);

    const newUnitPrice = 0;
    cartLine.setUnitPrice(newUnitPrice);

    expect(cartLine.getUnitPrice()).be.not.eq(unitPrice);
    expect(cartLine.getUnitPrice()).be.eq(0);
  })

  it('set price negative', () => {
    cartLine = new CartLine(itemId, quantity, unitPrice);

    const newUnitPrice = faker.random.number() * -1;
    cartLine.setUnitPrice(newUnitPrice);

    expect(cartLine.getUnitPrice()).be.not.eq(unitPrice);
    expect(cartLine.getUnitPrice()).be.eq(newUnitPrice);
  })

});
