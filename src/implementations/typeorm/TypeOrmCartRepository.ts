import { ICartRepository } from "../../interfaces/ICartRepository";
import { ICart } from "../../interfaces/ICart";
import { Connection } from "typeorm";
import { CartDbModel } from "./entities/CartDbModel";
import { ICartFactory } from "../../interfaces/ICartFactory";
import { CartLineDbModel } from "./entities/CartLineDbModel";

export class TypeOrmCartRepository implements ICartRepository {
  constructor(
    private connection: Connection,
    private cartFactory: ICartFactory
  ) {}

  createCartFromModel(cartDbModel: CartDbModel): ICart {
    const cart: ICart = this.cartFactory.createCartById(cartDbModel.id);
    for (let index = 0; index < cartDbModel.cartLines.length; index++) {
      const cartLineDbModel = cartDbModel.cartLines[index];
      cart.addItem(cartLineDbModel);
    }
    return cart;
  }

  getById(cartId: string | number): Promise<ICart> {
    let cartDbRepository = this.connection.getRepository(CartDbModel);
    return new Promise<ICart>(resolve => {
      cartDbRepository
        .findOne(cartId, { relations: ["cartLines"] })
        .then(cartDbModel => {
          const cart: ICart = this.createCartFromModel(cartDbModel);
          resolve(cart);
        })
        .catch(error => {
          throw new Error("Method not implemented." + error);
        });
    });
  }

  create(): Promise<ICart> {
    const cart: ICart = this.cartFactory.createCartById(null);
    return new Promise<ICart>(resolve => {
      resolve(cart);
    });
  }
  save(cart: ICart): Promise<ICart> {
    let cartDbModel: CartDbModel = new CartDbModel();
    cartDbModel.id = <number>cart.getId();
    const cartLines = cart.getCartLines();

    for (let index = 0; index < cartLines.length; index++) {
      const cartLine = cartLines[index];
      const cartLineDbModel = new CartLineDbModel();

      cartLineDbModel.cartId = cartDbModel.id;
      cartLineDbModel.itemId = <number>cartLine.getItemID();
      cartLineDbModel.quantity = cartLine.getQuantity();
      cartLineDbModel.unitPrice = cartLine.getUnitPrice();

      cartDbModel.cartLines.push(cartLineDbModel);
    }

    return new Promise<ICart>(resolve => {
      this.connection.manager.save(cartDbModel).then(cartDbModel => {
        const cart: ICart = this.createCartFromModel(cartDbModel);
        resolve(cart);
      });
    });
  }
}
