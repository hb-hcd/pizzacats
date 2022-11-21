import { ObjectId } from 'bson';
import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: '9377cfa68a1c735c5730bb20',
  name: 'A test pizza',
  description: 'test',
  imgSrc: 'pizza.png',
  toppingIds: ['564f0184537878b57efcb703'],
  toppings: [],
  priceCents: 3_50,
  ...data,
});
