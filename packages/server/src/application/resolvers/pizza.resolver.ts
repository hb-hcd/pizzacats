//import { Pizza, Pizza as SchemaPizza } from '../schema/types/schema';
import { Pizza as SchemaPizza } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { pizzaProvider } from '../providers';
import { PizzaData } from 'src/entities/pizza';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<PizzaData[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};

export type Pizza = Omit<SchemaPizza, 'toppings'> & {
  toppingIds: string[];
};

export { pizzaResolver };
