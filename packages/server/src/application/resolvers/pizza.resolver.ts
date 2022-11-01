import { Pizza as SchemaPizza } from '../schema/types/schema';
import { pizzaProvider } from '../providers';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<SchemaPizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};

export type Pizza = Omit<SchemaPizza, 'toppings' | 'priceCents'> & {
  toppingIds: string[];
};

export { pizzaResolver };
