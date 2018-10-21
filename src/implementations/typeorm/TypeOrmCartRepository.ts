import { ICartRepository } from "../../interfaces/ICartRepository";
import { ICart } from "../../interfaces/ICart";
import { Connection } from "typeorm";
import { CartDbModel } from "./entities/CartDbModel";
import { ICartFactory } from "../../interfaces/ICartFactory";
import { CartFactoryDbModelDecorated } from "./CartFactoryDbModelDecorated";
import { CartLineDbModelFactory } from "./CartLineDbModelFactory";

export class TypeOrmCartRepository implements ICartRepository {
  protected cartFactory: CartFactoryDbModelDecorated;
  protected cartLineDbModelFactory: CartLineDbModelFactory;

  constructor(protected connection: Connection, cartFactory: ICartFactory) {
    this.cartFactory = new CartFactoryDbModelDecorated(cartFactory);
    this.cartLineDbModelFactory = new CartLineDbModelFactory();
  }

  getById(cartId: string | number): Promise<ICart> {
    let cartDbRepository = this.connection.getRepository(CartDbModel);
    return new Promise<ICart>(resolve => {
      cartDbRepository
        .findOne(cartId, { relations: ["cartLines"] })
        .then(cartDbModel => {
          const cart: ICart = this.cartFactory.createCartFromModel(cartDbModel);
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

    return new Promise<ICart>(async resolve => {
      await this.connection.transaction(async transactionalEntityManager => {
        cartDbModel = await transactionalEntityManager.save(cartDbModel);
        for (let index = 0; index < cartLines.length; index++) {
          const cartLine = cartLines[index];
          const cartLineDbModel = this.cartLineDbModelFactory.createWithCartIdFromCartLine(
            cartDbModel.id,
            cartLine
          );
          await transactionalEntityManager.save(cartLineDbModel)
        }
      }).catch(error => {
        throw new Error("Method not implemented." + error);
      });

      resolve(this.getById(cartDbModel.id));
    });
  }
}
