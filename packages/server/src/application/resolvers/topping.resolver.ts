import { CreateToppingInput, DeleteToppingInput, Pizza, Topping, UpdateToppingInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { toppingProvider, pizzaProvider } from '../providers';

const toppingResolver = {
  Query: {
    toppings: async (): Promise<Topping[]> => {
      return toppingProvider.getToppings();
    },
    // Pizza: {
    //   toppings: async( Pizza:{toppingIds:[string]} ) : Promise<Topping[]>=>{
    //        return toppingProvider.getToppingsByIds(Pizza.toppingIds);
    //   }
    // }
  },
  Pizza: {
    toppings: async (pizza: { toppingIds: [string] }): Promise<Topping[]> => {
      return toppingProvider.getToppingsByIds(pizza.toppingIds);
    },
  },

  Mutation: {
    createTopping: async (_: Root, args: { input: CreateToppingInput }): Promise<Topping> => {
      return toppingProvider.createTopping(args.input);
    },

    deleteTopping: async (_: Root, args: { input: DeleteToppingInput }): Promise<string> => {
      return toppingProvider.deleteTopping(args.input.id);
    },

    updateTopping: async (_: Root, args: { input: UpdateToppingInput }): Promise<Topping> => {
      return toppingProvider.updateTopping(args.input);
    },
  },
};

export { toppingResolver };
