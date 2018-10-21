import { ICartRepository } from "../../interfaces/ICartRepository";
import { ICart } from "../../interfaces/ICart";
import { Connection } from "typeorm";
import { CartDbModel } from "./entities/CartDbModel";
import { ICartFactory } from "../../interfaces/ICartFactory";
import { CartFactoryDbModelDecorated } from "./CartFactoryDbModelDecorated";
import { CartLineDbModelFactory } from "./CartLineDbModelFactory";
import { CartLineDbModel } from "./entities/CartLineDbModel";

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
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.startTransaction();
      
      try {
        cartDbModel = await queryRunner.manager.save(cartDbModel);
        await this.connection.createQueryBuilder()
          .delete()
          .from(CartLineDbModel)
          .where("cartId = :cartId", { cartId: cartDbModel.id }).execute();

        for (let index = 0; index < cartLines.length; index++) {
          const cartLine = cartLines[index];
          const cartLineDbModel = this.cartLineDbModelFactory.createWithCartIdFromCartLine(
            cartDbModel.id,
            cartLine
          );
          await queryRunner.manager.save(cartLineDbModel)
        }

      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new Error("Method not implemented." + error);
      }

      await queryRunner.commitTransaction();
      resolve(this.getById(cartDbModel.id));
    });
  }
}
