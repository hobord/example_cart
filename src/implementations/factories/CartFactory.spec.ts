import { expect } from "chai";
import "mocha";
import * as faker from "faker";
import { Cart } from "../../Cart";
import { ICart } from "../../interfaces/ICart";
import { ICartLineFactory } from "../../interfaces/ICartLineFactory";
import { ICartLineStrategy } from "../../interfaces/ICartLineStrategy";
import { CartFactory } from "./CartFactory";


describe("CartFactory", () => {
  let cartFactory: CartFactory;
  let cartId: number;
  let cart: ICart;
  let cartLineFactory: ICartLineFactory;
  let cartLineStrategy: ICartLineStrategy;

  beforeEach(function () {
    cartFactory = new CartFactory(cartLineFactory, cartLineStrategy);
  })

  it("The factory should be create a Cart object", () => {
    cartId = faker.random.number();
    cart = cartFactory.createCartById(cartId);
    expect(cart).to.instanceof(Cart);
  });

  it("The created a Cart object should has correct id", () => {
    cartId = faker.random.number();
    cart = cartFactory.createCartById(cartId);
    expect(cart.getId()).be.eq(cartId);
  });
});
