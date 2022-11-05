import { Collection, ObjectId } from 'mongodb';
import { reveal, stub } from 'jest-auto-stub';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { createMockPizzaDocument } from '../../test/helpers/pizza.helper';
import { mockSortToArray } from '../helpers/mongo.helper';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { ToppingDocument, toToppingObject } from '../../src/entities/topping';
import { DeletePizzaInput } from 'src/application/schema/types/schema';

const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingProvider = stub<ToppingProvider>();

const pizzaProvider = new PizzaProvider(stubPizzaCollection, stubToppingProvider);

beforeEach(jest.clearAllMocks);

describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);

  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).find.mockImplementation(mockSortToArray([mockPizzaDocument]));
    });
    test('should call find once', async () => {
      await pizzaProvider.getPizzas();
      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });
    test('should get all pizzas', async () => {
      const result = await pizzaProvider.getPizzas();

      expect(result).toEqual([mockPizza]);
    });
  });

  describe('createPizza', (): void => {
    const testPizza = {
      name: 'test pizza',
      description: 'testing',
      imgSrc: 'pizza.png',
      toppingIds: ['564f0184537878b57efcb703'],
    };
    const validPizza = createMockPizzaDocument(testPizza);
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });
    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza({
        name: testPizza.name,
        description: testPizza.name,
        imgSrc: testPizza.imgSrc,
        toppingIds: [new ObjectId(testPizza.toppingIds[0])],
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
        name: testPizza.name,
        description: testPizza.name,
        imgSrc: testPizza.imgSrc,
        toppingIds: [new ObjectId(testPizza.toppingIds[0])],
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  describe('deletePizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });
    const input: DeletePizzaInput = { id: mockPizza.id };
    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(input);
      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });
    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));
      await expect(pizzaProvider.deletePizza(input)).rejects.toThrow(new Error('Could not delete the pizza'));
    });
    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(input);

      expect(result).toEqual(mockPizza.id);
    });
  });
  describe('updatePizza', (): void => {
    const testPizza = {
      name: 'test pizza',
      description: 'testing',
      imgSrc: 'pizza.png',
      toppingIds: ['564f0184537878b57efcb703'],
    };
    const validPizza = createMockPizzaDocument(testPizza);
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });
    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.name,
        imgSrc: validPizza.imgSrc,
        toppingIds: [new ObjectId(validPizza.toppingIds[0])],
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: testPizza.name,
        description: testPizza.name,
        imgSrc: testPizza.imgSrc,
        toppingIds: [new ObjectId(testPizza.toppingIds[0])],
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });
});
