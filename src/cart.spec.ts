import { expect } from 'chai';
import 'mocha';
import * as faker from 'faker'
import * as sinon from "ts-sinon";
import { ICart } from './ICart';
import { ICartLine, ICartItem, IItemQuantity } from './ICartLine';
import { Cart } from './Cart';
import { ICartItemRepository } from './ICartItemRepository';

class MockCartItemRepository implements ICartItemRepository {

}

class MockProduct implements ICartItem {
  getItemID(): string | number {
    throw new Error("Method not implemented.");
  }  getQuantity(): string | number {
    throw new Error("Method not implemented.");
  }
  getUnitPrice(): string | number {
    throw new Error("Method not implemented.");
  }
}

describe('cart', () => {
  let mockCartItemRepository: ICartItemRepository
  let cartId: number
  let cart: ICart

  beforeEach(function() {
      mockCartItemRepository = new MockCartItemRepository()
      cartId = faker.random.number()
      cart = new Cart(cartId, mockCartItemRepository)
  })

  it('New cart should be a Cart object', () => {
    expect(cart).to.instanceof(Cart)
  })

  it('Get back the id number', () => {
    const cartId: number = faker.random.number()
    const cart: ICart = new Cart(cartId, mockCartItemRepository)
    expect(cart.getId()).equal(cartId)
  })

  it('Get back the id string', () => {
    const cartId: string = faker.random.alphaNumeric(255)
    const cart: ICart = new Cart(cartId, mockCartItemRepository)
    expect(cart.getId()).equal(cartId)
  })

  it('Add new unique cart item', () => {

    cart->addItem(cartItem)
  })

});