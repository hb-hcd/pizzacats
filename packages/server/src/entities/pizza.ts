import { Document, ObjectId } from 'mongodb';
import { Pizza } from '../application/providers/pizzas/pizza.provider.types';
import { Scalars, Topping } from '../application/schema/types/schema';

interface PizzaDocument extends Document, Omit<Pizza, 'id'> {
  // id: Scalars['ObjectID'];
  // name: Scalars['String'];
  // description: Scalars['String'];
  // imgSrc: Scalars['String'];
  // toppings: [Topping];
  // toppingIds: [ObjectId];
}

interface PizzaData extends Document {
  id: Scalars['ObjectID'];
  name: Scalars['String'];
  description: Scalars['String'];
  imgSrc: Scalars['String'];
  toppingIds: [string];
}

const toPizzaObject = (pizza: PizzaDocument): PizzaData => {
  return {
    id: pizza._id.toHexString(),
    name: pizza.name,
    description: pizza.description,
    imgSrc: pizza.imgSrc,
    toppingIds: pizza.toppingIds,
  };
};

export { PizzaDocument, toPizzaObject, PizzaData };
