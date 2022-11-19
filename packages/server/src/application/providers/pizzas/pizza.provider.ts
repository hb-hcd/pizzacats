import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../..//entities/pizza';
import { Pizza, CreatePizzaInput, UpdatePizzaInput, DeleteToppingInput } from './pizza.provider.types';
import validateStringInputs from '../../../lib/string-validator';
import { CursorProvider } from '../cursor/cursor.provider';
import { GetPizzasResponse } from './pizza.provider.types';
import { QueryInput } from 'src/application/schema/types/schema';
import { ToppingProvider } from '../toppings/topping.provider';

class PizzaProvider {
  constructor(
    private collection: Collection<PizzaDocument>,
    private toppingProvider: ToppingProvider,
    private cursorProvider: CursorProvider
  ) {}

  public async getPizzas(input: QueryInput): Promise<GetPizzasResponse> {
    const { cursor, limit } = input;
    return this.cursorProvider.getCursorResult(cursor, limit);
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    const { name, description, imgSrc, toppingIds } = input;
    validateStringInputs([name, description, imgSrc]);
    const stringIds: string[] = [];
    toppingIds.map((id) => {
      stringIds.push(id.toString());
    });
    await this.toppingProvider.validateToppings(stringIds);
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: { ...input!, updateAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} pizza`);
    }
    const newpizza = data.value;
    return toPizzaObject(newpizza);
  }

  public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
    const { id, name, description, imgSrc, toppingIds } = input;
    if (toppingIds) {
      const stringIds: string[] = [];
      toppingIds.map((id) => {
        stringIds.push(id.toString());
      });
      await this.toppingProvider.validateToppings(stringIds);
    }
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(toppingIds && { toppingIds: toppingIds }),
        },
      },
      { returnDocument: 'after' }
    );
    if (!data.value) {
      throw new Error('Could not update the pizza');
    }
    const updatedPizza = data.value;
    return toPizzaObject(updatedPizza);
  }

  public async deletePizza(input: DeleteToppingInput): Promise<string> {
    const idToDelete = new ObjectId(input.id);
    const data = await this.collection.findOneAndDelete({ _id: idToDelete });
    if (!data.value) {
      throw new Error(`Could not delete the pizza`);
    }
    return input.id;
  }
}

export { PizzaProvider };
