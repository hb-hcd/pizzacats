import { ObjectId, Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../..//entities/pizza';
import { Pizza } from './pizza.provider.types';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizzas(): Promise<Pizza[]> {
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }

  //testing
  // public async getPizza(id:string): Promise<Pizza>{
  //   const pizza = await this.collection.findOne({_id: new ObjectId(id)}).catch(

  //   );
  //   if(pizza == null){
  //     throw new Error(`pizza with id:${id} is not found`);
  //   }
  //   return pizza.map(toPizzaObject);
  // }
}

export { PizzaProvider };
