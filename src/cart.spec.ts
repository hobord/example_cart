import { expect } from 'chai';
import 'mocha';
import * as faker from 'faker'
import * as sinon from "ts-sinon";
import { ICart } from './ICart';
import { ICartLine, ICartItem, IItemQuantity } from './ICartLine';
import { Cart } from './Cart';

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

  beforeEach(function() {
    cartId = faker.random.number()
    cart = new Cart(cartId)
  })

  it('New cart should be a Cart object', () => {
    expect(cart).to.instanceof(Cart)
  })

  it('Get back the id number', () => {
    const cartId: number = faker.random.number()
    const cart: ICart = new Cart(cartId)
    expect(cart.getId()).equal(cartId)
  })

  it('Get back the id string', () => {
    const cartId: string = faker.random.alphaNumeric(255)
    const cart: ICart = new Cart(cartId)
    expect(cart.getId()).equal(cartId)
  })

  it('Add new unique cart item', () => {
    const cartItem: ICartItem = new MockProduct()
    cart.addItem(cartItem)
    cart.addItem(cartItem)
  })

});
