import { TypeOrmCartRepository } from "../src/implementations/typeorm/TypeOrmCartRepository";
import { createConnection } from "typeorm";
import { CartFactory } from "../src/implementations/factories/CartFactory";
import { CartLineFactory } from "../src/implementations/factories/CartLineFactory";
import { MultiPriceCartLineStrategy } from "../src/implementations/strategies/MultiPriceCartLineStrategy";
import { ICartItem } from "../src/interfaces";
import * as faker from "faker";

class Product implements ICartItem {
  getItemID(): string | number {
    return faker.random.number()
  }  
  getQuantity(): number {
    return faker.random.number()
  }
  getUnitPrice(): number {
    return faker.random.number()
  }

  
}


createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "mysql",
  database: "test",
  synchronize: true,
  entities: ["src/implementations/typeorm/entities/**/*.ts"],
  logging: false
}).then(async connection => {
  const cartLineFactory = new CartLineFactory();
  const cartLineStrategy = new MultiPriceCartLineStrategy(cartLineFactory);
  const cartFactory = new CartFactory(cartLineFactory, cartLineStrategy);

  const cartRepository = new TypeOrmCartRepository(connection, cartFactory);

  let cart = await cartRepository.create();


  let cartItem = new Product()
  cart.addItem(cartItem)
  cart.addItem(cartItem)
  cart.addItem(cartItem)
  
  cart = await cartRepository.save(cart);

  cart.addItem(cartItem)

  cart = await cartRepository.save(cart);
  console.log(cart)
}).catch(error => {
  console.log(error)
});
