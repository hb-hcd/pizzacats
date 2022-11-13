import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';
import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Topping, Pizza } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaList from '../PizzaList';

describe('PizzaList', () => {
  const renderPizzaList = () => {
    const view = renderWithProviders(<PizzaList />);
    return {
      ...view,
      $findPizzaItems: () => screen.getAllByTestId(/^pizza-item-/),
      $findPizzaItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockpPizzasQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            pizzas: [...data],
          })
        );
      })
    );
  };

  beforeEach(() => {
    const pizza1 = createTestPizza();

    mockpPizzasQuery([pizza1]);
  });
  test('should display a list of pizzas', async () => {
    const { $findPizzaItems } = renderPizzaList();
    await waitFor(() => expect($findPizzaItems()).toHaveLength(2));
  });
});
