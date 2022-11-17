import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import CardItemSkeleton from '../common/CardItemSkeleton';
import PizzaItem from './PizzaItem';
import { Pizza } from '../../types';
import { useState } from 'react';
import { PizzaModal } from './PizzaModal';
import Grid from '@mui/material/Grid';

const PizzaList: React.FC = () => {
  const [selectedPizza, setSelectedPizza] = useState<Partial<Pizza>>();
  const [open, setOpen] = useState(false);
  const selectPizza = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };
  const { loading, error, data } = useQuery(GET_PIZZAS);
  const cards: number = 10;

  if (loading) {
    return (
      <div>
        {Array(cards)
          .fill(0)
          .map((item, i) => (
            <CardItemSkeleton key={i} />
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1> {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <Grid container spacing={2} rowSpacing={2} columnSpacing={3}>
        <PizzaItem key="create-pizza" selectPizza={selectPizza} />

        {data.pizzas.map((pizza: Pizza) => (
          <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} selectPizza={selectPizza} />
        ))}
      </Grid>

      <PizzaModal selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} open={open} setOpen={setOpen} />
    </>
  );
};

export default PizzaList;
