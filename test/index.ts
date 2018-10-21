import { TypeOrmCartRepository } from "../src/implementations/typeorm/TypeOrmCartRepository";
import { createConnection } from "typeorm";
import { CartFactory } from "../src/implementations/factories/CartFactory";
import { CartLineFactory } from "../src/implementations/factories/CartLineFactory";
import { MultiPriceCartLineStrategy } from "../src/implementations/strategies/MultiPriceCartLineStrategy";


createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
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
  cart = await cartRepository.save(cart);
  console.log(cart)
});
