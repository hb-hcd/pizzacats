import { Pizza as SchemaPizza } from '../schema/types/schema';
import { pizzaProvider } from '../providers';
import { Root } from '../schema/types/types';
import { CreatePizzaInput, UpdatePizzaInput, DeleteToppingInput } from '../providers/pizzas/pizza.provider.types';
import { QueryInput } from '../schema/types/schema';
import { GetPizzasResponse } from '../schema/types/schema';

const pizzaResolver = {
  Query: {
    pizzas: async (_: Root, args: { input: QueryInput }): Promise<GetPizzasResponse> => {
      return pizzaProvider.getPizzas(args.input);
    },
  },
  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.createPizza(args.input);
    },
    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.updatePizza(args.input);
    },
    deletePizza: async (_: Root, args: { input: DeleteToppingInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input);
    },
  },
};

export type Pizza = Omit<SchemaPizza, 'toppings' | 'priceCents'> & {
  toppingIds: string[];
};

export { pizzaResolver };
