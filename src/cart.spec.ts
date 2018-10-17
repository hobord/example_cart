import { expect } from 'chai';
import 'mocha';
import * as faker from 'faker'
import * as sinon from "ts-sinon";
import { ICart } from './interfaces/ICart';
import { ICartLine } from './interfaces/ICartLine';
import { IItemQuantity } from "./interfaces/IItemQuantity";
import { ICartItem } from "./interfaces/ICartItem";
import { Cart } from './Cart';
import { ICartLineFactory } from './interfaces/ICartLineFactory';
import { ICartLineStrategy } from './interfaces/ICartLineStrategy';
import { MultiPriceCartLineStrategy } from './implementations/MultiPriceCartLineStrategy';
import { CartLineFactory } from './implementations/CartLineFactory';
import { SimpleCartLineStrategy } from './implementations/SimpleCartLineStrategy';
import { SimpleUpdatePriceCartLineStrategy } from './implementations/SimpleUpdatePriceCartLineStrategy';

class MockProduct implements ICartItem {
  price = 1;
  getItemID(): string | number {
    return 1
  }  
  getQuantity(): number {
    return 1
  }
  getUnitPrice(): number {
    return this.price
  }
  setUnitPrice(price: number) {
    this.price = price
  }
}

describe('cart', () => {
  let cartId: number
  let cart: ICart
  let cartLineFactory: ICartLineFactory
  let cartLineStrategy: ICartLineStrategy
  
  beforeEach(function() {
    cartId = faker.random.number()
    cartLineFactory = new CartLineFactory()
    // cartLineStrategy = new MultiPriceCartLineStrategy(cartLineFactory)
    // cartLineStrategy = new SimpleCartLineStrategy(cartLineFactory)
    cartLineStrategy = new SimpleUpdatePriceCartLineStrategy(cartLineFactory)
  
    cart = new Cart(cartId, cartLineFactory, cartLineStrategy)
  })

  it('New cart should be a Cart object', () => {
    expect(cart).to.instanceof(Cart)
  })

  it('Get back the id number', () => {
    const cartId: number = faker.random.number()
    const cart: ICart = new Cart(cartId, cartLineFactory, cartLineStrategy)
    expect(cart.getId()).equal(cartId)
  })

  it('Get back the id string', () => {
    const cartId: string = faker.random.alphaNumeric(255)
    const cart: ICart = new Cart(cartId, cartLineFactory, cartLineStrategy)
    expect(cart.getId()).equal(cartId)
  })

  it('Add new unique cart item', () => {
    const cartItem: MockProduct = new MockProduct()
    cart.addItem(cartItem)
    const cartItem2: MockProduct = new MockProduct()
    cartItem2.setUnitPrice(23)
    cart.addItem(cartItem2)

    for (let item of cart) {
      console.log(item);
    }
    // for (let item of cart) {
    //   console.log(item);
    // }

    for (let item in cart) {
      console.log(item);
    }
  })

});
