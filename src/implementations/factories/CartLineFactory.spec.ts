import { expect } from "chai";
import "mocha";
import * as faker from "faker";
import { ICartItem } from "../../interfaces/ICartItem";
import { ICartLine } from "../../interfaces/ICartLine";
import { CartLineFactory } from "./CartLineFactory";
import { CartLine } from "../CartLine";

describe("CartLineFactory", () => {
  let cartLineFactory: CartLineFactory;
  let cartLine: ICartLine;
  let cartItem: ICartItem;

  beforeEach(function() {
    cartLineFactory = new CartLineFactory();
  });

  it("The factory should be create a CartLine object", () => {
    cartItem = <ICartItem>{
      getItemID() {
        return faker.random.uuid();
      },
      getQuantity() {
        return faker.random.number();
      },
      getUnitPrice() {
        return faker.random.number();
      }
    };
    cartLine = cartLineFactory.createFromItem(cartItem);
    expect(cartLine).to.instanceof(CartLine);
  });

  it("The created a CartLine object should has correct id", () => {
    const randomId: string = faker.random.uuid();
    cartItem = <ICartItem>{
      getItemID() {
        return randomId;
      },
      getQuantity() {
        return faker.random.number();
      },
      getUnitPrice() {
        return faker.random.number();
      }
    };
    cartLine = cartLineFactory.createFromItem(cartItem);
    expect(cartLine.getItemID()).be.eq(randomId);
  });

  it("The created a CartLine object should has correct quantity", () => {
    const randomQuantity: number = faker.random.number();
    cartItem = <ICartItem>{
      getItemID() {
        return faker.random.uuid();;
      },
      getQuantity() {
        return randomQuantity;
      },
      getUnitPrice() {
        return faker.random.number();
      }
    };
    cartLine = cartLineFactory.createFromItem(cartItem);
    expect(cartLine.getQuantity()).be.eq(randomQuantity);
  });

  it("The created a CartLine object should has correct price", () => {
    const randomPrice: number = faker.random.number();
    cartItem = <ICartItem>{
      getItemID() {
        return faker.random.uuid();;
      },
      getQuantity() {
        return faker.random.number();
      },
      getUnitPrice() {
        return randomPrice;
      }
    };
    cartLine = cartLineFactory.createFromItem(cartItem);
    expect(cartLine.getUnitPrice()).be.eq(randomPrice);
  });
});
