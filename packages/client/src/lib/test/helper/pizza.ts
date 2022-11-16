import { ObjectId } from 'bson';
import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'A test pizza',
  description: 'test',
  imgSrc: 'pizza.png',
  toppingIds: ['564f0184537878b57efcb703'],
  toppings: [],
  priceCents: 3_50,
  ...data,
});
