import { Pizza } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { pizzaProvider } from '../providers';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
    // pizza: async(id:string): Promise<Pizza> =>{
    //   return pizzaProvider.getPizza(id);
    // }
  },
};

export { pizzaResolver };
