import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaItem, { PizzaItemProps } from '../PizzaItem';
import { act } from 'react-dom/test-utils';

describe('PizzaItem', () => {
  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzaItem {...props} />);
    return {
      ...view,
      $getName: () => screen.getByTestId(/^pizza-name-/),
      $getDescription: () => screen.getByTestId(/^pizza-description-/),
      $getPriceCents: () => screen.getByTestId(/^pizza-priceCents-/),
      $getContainer: () => screen.getByTestId(/^pizza-item/),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    selectPizza: jest.fn(),
    pizza: createTestPizza(),
  };

  test('should display all components of the pizza item', async () => {
    const { $getName, $getDescription, $getPriceCents } = renderPizzaList(props);
    expect($getName()).toBeVisible();
    expect($getDescription()).toBeVisible();
    expect($getPriceCents()).toBeVisible();
  });

  test('should call selectPizza when the any part of the container is clicked', async () => {
    const { $getContainer } = renderPizzaList(props);
    act(() => userEvent.click($getContainer()));
    expect(props.selectPizza).toHaveBeenCalledTimes(1);
  });
});
