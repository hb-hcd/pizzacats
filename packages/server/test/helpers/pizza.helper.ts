import { ObjectId } from 'bson';
import { Pizza } from 'src/application/schema/types/schema';
import { PizzaDocument } from 'src/entities/pizza';
import { GetPizzasResponse } from 'src/application/schema/types/schema';

const createMockPizzaResponse = (): GetPizzasResponse => {
  return {
    __typename: 'GetPizzasResponse',
    cursor: new ObjectId().toString(),
    hasNextPage: false,
    totalCount: 1,
    results: [
      {
        __typename: 'Pizza',
        id: new ObjectId().toHexString(),
        name: 'Hawaiian',
        description: 'Fruity and yummy',
        imgSrc: 'fjsalfk.png',
        toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'] as any,
        toppings: [
          {
            __typename: 'Topping',
            id: '19651dda4a0af8315d840412',
            name: 'Anchovy',
            priceCents: 300,
          },
          {
            __typename: 'Topping',
            id: 'e9e565e9a57cf33fb9b8ceed',
            name: 'BBQ Sauce',
            priceCents: 400,
          },
        ] as any,
        priceCents: 700,
      },
    ],
  };
};

const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId().toHexString(),
    name: 'Hawaiian',
    description: 'Fruity and yummy',
    imgSrc: 'fjsalfk.png',
    toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'] as any,
    toppings: [
      {
        __typename: 'Topping',
        id: '19651dda4a0af8315d840412',
        name: 'Anchovy',
        priceCents: 300,
      },
      {
        __typename: 'Topping',
        id: 'e9e565e9a57cf33fb9b8ceed',
        name: 'BBQ Sauce',
        priceCents: 400,
      },
    ] as any,
    priceCents: 700,
    ...data,
  };
};

const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    _id: new ObjectId(),
    name: 'Hawaiian',
    description: 'Fruity and yummy',
    imgSrc: 'fjsalfk.png',
    toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
    toppings: [
      {
        id: '19651dda4a0af8315d840412',
        name: 'Anchovy',
        priceCents: 400,
      },
      {
        id: 'e9e565e9a57cf33fb9b8ceed',
        name: 'BBQ Sauce',
        priceCents: 400,
      },
    ],
    priceCents: 700,
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument, createMockPizzaResponse };
