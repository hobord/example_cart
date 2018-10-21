import { expect } from "chai";
import "mocha";
import * as faker from "faker";
import { SimpleCartLineStrategy } from "./SimpleCartLineStrategy";
import { CartLineFactory } from "../factories/CartLineFactory";
import { CartLine } from "../CartLine";
import { ICartItem } from "../../interfaces/ICartItem";

describe("SimpleCartLineStrategy", () => {
  let strategy: SimpleCartLineStrategy;
  let cartLineFactory: CartLineFactory;
  let cartLines: CartLine[];
  let cartItem: ICartItem;

  beforeEach(function() {
    cartLineFactory = new CartLineFactory();
    strategy = new SimpleCartLineStrategy(cartLineFactory);
  });

  it("Simple quantity test", () => {
    cartLines = [];
    let price: number = faker.random.number({
      min: 1
    });
    let quantity: number = faker.random.number({
      min: 1
    });
    let sumQuantity: number = 0;

    let iteration: number = faker.random.number({
      min: 1,
      max: 100
    });
    for (let index = 0; index < iteration; index++) {
      cartItem = <ICartItem>{
        getItemID() {
          return 1;
        },
        getQuantity() {
          return quantity;
        },
        getUnitPrice() {
          return price;
        }
      };
      sumQuantity += quantity;
      strategy.addItem(cartLines, cartItem);
    }
    expect(cartLines[0].getQuantity()).be.eq(sumQuantity);
  });

  it("Simple price test", () => {
    cartLines = [];
    let price: number = faker.random.number({
      min: 1
    });
    let quantity: number = faker.random.number({
      min: 1
    });
    let sumQuantity: number = 0;

    let iteration: number = faker.random.number({
      min: 1,
      max: 100
    });
    for (let index = 0; index < iteration; index++) {
      cartItem = <ICartItem>{
        getItemID() {
          return 1;
        },
        getQuantity() {
          return quantity;
        },
        getUnitPrice() {
          return price;
        }
      };
      sumQuantity += quantity;
      strategy.addItem(cartLines, cartItem);
    }
    expect(cartLines[0].getUnitPrice()).be.eq(price);
  });

  it("Multi price test", () => {
    cartLines = [];
    let sumQuantity: number = 0;
    let endPrice: number = 0;

    let iteration: number = faker.random.number({
      min: 1,
      max: 100
    });

    for (let index = 0; index < iteration; index++) {
      let quantity: number = faker.random.number({
        min: 1
      });
      let price: number = faker.random.number({
        min: 1,
        max: 100
      });

      if (index === 0) {
        endPrice = price + (index + 1) * 100;
      }

      cartItem = <ICartItem>{
        getItemID() {
          return 1;
        },
        getQuantity() {
          return quantity;
        },
        getUnitPrice() {
          return price + (index + 1) * 100;
        }
      };

      sumQuantity += quantity;
      strategy.addItem(cartLines, cartItem);
    }

    expect(cartLines.length).be.eq(1);
    expect(cartLines[0].getUnitPrice()).be.eq(endPrice);
    expect(cartLines[0].getQuantity()).be.eq(sumQuantity);
  });

  it("Add different item ids test", () => {
    cartLines = [];
    let iteration: number = faker.random.number({
      min: 1,
      max: 100
    });
    for (let index = 0; index < iteration; index++) {
      let price: number = faker.random.number({
        min: 1
      });
      let quantity: number = faker.random.number({
        min: 1
      });

      cartItem = <ICartItem>{
        getItemID() {
          return index;
        },
        getQuantity() {
          return quantity;
        },
        getUnitPrice() {
          return price;
        }
      };
      strategy.addItem(cartLines, cartItem);
    }
    expect(cartLines.length).be.eq(iteration);
  });

  // TODO: remove tests
});
