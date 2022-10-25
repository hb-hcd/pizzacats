import { Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject, PizzaData } from '../../..//entities/pizza';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizzas(): Promise<PizzaData[]> {
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }
}

export { PizzaProvider };
