import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../..//entities/pizza';
import { Pizza, CreatePizzaInput, UpdatePizzaInput, DeleteToppingInput } from './pizza.provider.types';
import validateStringInputs from '../../../lib/string-validator';
import { toppingProvider } from '..';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizzas(): Promise<Pizza[]> {
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    const { name, description, imgSrc, toppingIds } = input;
    validateStringInputs([name, description, imgSrc]);
    const stringIds: string[] = [];
    toppingIds.map((id) => {
      stringIds.push(id.toString());
    });
    toppingProvider.validateToppings(stringIds);
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
      toppingProvider.validateToppings(stringIds);
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
    const { id } = input;
    const idToDelete = new ObjectId(id);
    const data = await this.collection.findOneAndDelete({ _id: idToDelete });
    if (!data.value) {
      throw new Error(`Could not delete the pizza`);
    }
    return id;
  }
}

export { PizzaProvider };
