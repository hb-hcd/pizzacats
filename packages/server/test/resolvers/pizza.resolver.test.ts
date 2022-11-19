import { gql } from 'apollo-server-core';

import { pizzaProvider } from '../../src/application/providers';
import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreatePizzaArgs,
  MutationUpdatePizzaArgs,
  MutationDeletePizzaArgs,
  QueryPizzasArgs,
} from '../../src/application/schema/types/schema';

import { createMockPizza } from '../helpers/pizza.helper';
import { createMockPizzaResponse } from '../helpers/pizza.helper';
import { TestClient } from '../helpers/client.helper';
import { ObjectId } from 'mongodb';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockPizza = createMockPizza();
const mockPizzaResponse = createMockPizzaResponse();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, pizzaResolver);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query Pizzas($input: QueryInput!) {
          pizzas(input: $input) {
            cursor
            hasNextPage
            results
            totalCount
          }
        }
      `;
      const variables: QueryPizzasArgs = {
        input: {
          cursor: '7b33fd8dd265Bc38d930844c',
          limit: 2,
        },
      };

      test('should get all pizzas', async () => {
        jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue(mockPizzaResponse);
        const result = await client.query({ query, variables });

        expect(result.data).not.toEqual({
          pizzas: {
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
          },
        });

        expect(pizzaProvider.getPizzas).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            name
            description
            imgSrc
            toppingIds
          }
        }
      `;
      const validPizza = createMockPizza({
        name: 'test pizza',
        description: 'testing',
        imgSrc: 'pizza.png',
        toppingIds: [new ObjectId().toString()],
      });
      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(validPizza);
      });
      test('should call create pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };
        await client.mutate({ mutation, variables });
        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return created pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };
        const result = await client.mutate({ mutation, variables });
        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        });
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input)
        }
      `;
      const variables: MutationDeletePizzaArgs = { input: { id: mockPizza.id } };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(mockPizza.id);
      });
      test('should call deletePizza with id', async () => {
        await client.mutate({ mutation, variables });
        expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return deleted pizza id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deletePizza: mockPizza.id,
        });
      });
    });

    describe('updatePizza', () => {
      const mutation = gql`
        mutation ($input: UpdatePizzaInput!) {
          updatePizza(input: $input) {
            id
            name
            description
            imgSrc
            toppingIds
            toppings {
              id
              name
              priceCents
            }
            priceCents
          }
        }
      `;
      const updatedPizza = createMockPizza({
        name: 'update pizza',
        toppingIds: [],
        toppings: [],
      });
      const variables: MutationUpdatePizzaArgs = {
        input: {
          id: mockPizza.id,
          name: updatedPizza.name,
          toppingIds: updatedPizza.toppingIds,
        },
      };
      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatedPizza);
      });
      test('should call updatePizza with input', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return updated pizza', async () => {
        const result = await client.mutate({ mutation, variables });

        expect({ ...result.data }).toEqual({
          updatePizza: {
            ...updatedPizza,
          },
        });
      });
    });
  });
});
