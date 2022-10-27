import { Pizza as SchemaPizza } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { pizzaProvider } from '../providers';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<SchemaPizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};

export type Pizza = Omit<SchemaPizza, 'toppings'> & {
  toppingIds: string[];
};

export { pizzaResolver };
