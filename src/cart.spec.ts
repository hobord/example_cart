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

class MockProduct implements ICartItem {
  getItemID(): string | number {
    return 1
  }  
  getQuantity(): number {
    return 1
  }
  getUnitPrice(): number {
    return 1
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
    cartLineStrategy = new MultiPriceCartLineStrategy()
  
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
    const cartItem: ICartItem = new MockProduct()
    cart.addItem(cartItem)
    cart.addItem(cartItem)

    for (let item of cart) {
      console.log(item);
    }
    for (let item of cart) {
      console.log(item);
    }

    for (let item in cart) {
      console.log(item);
    }
  })

});
