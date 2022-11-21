import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';
import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Pizza } from '../../../types';
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

  const mockpPizzasQuery = (data: any) => {
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            pizzas: {
              results: [data],
              hasNextPage: false,
              totalCount: 1,
              cursor: '9377cfa68a1c735c5730bb20',
            },
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
