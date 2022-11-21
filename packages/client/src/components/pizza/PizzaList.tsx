import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import CardItemSkeleton from '../common/CardItemSkeleton';
import PizzaItem from './PizzaItem';
import { Pizza } from '../../types';
import { useState } from 'react';
import { PizzaModal } from './PizzaModal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const PizzaList: React.FC = () => {
  const [selectedPizza, setSelectedPizza] = useState<Partial<Pizza>>();
  const [currCursor, setcurrCursor] = useState('');
  const [open, setOpen] = useState(false);
  const selectPizza = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };
  const { loading, error, data, fetchMore } = useQuery(GET_PIZZAS, {
    variables: { input: { cursor: currCursor, limit: 4 } },
  });
  const cards: number = 6;

  const updatePizzasQuery = (previousResult: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult) {
      return previousResult;
    }
    const previousPizzas = previousResult.pizzas.results;
    const fetchMorePizzas = fetchMoreResult.pizzas.results;
    fetchMoreResult.pizzas.results = [...previousPizzas, ...fetchMorePizzas];
    return { ...fetchMoreResult };
  };

  if (loading) {
    return (
      <Grid container spacing={2} rowSpacing={2} columnSpacing={3}>
        {Array(cards)
          .fill(0)
          .map((item, i) => (
            <CardItemSkeleton key={i} />
          ))}
      </Grid>
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

        {data.pizzas.results.map((pizza: Pizza) => (
          <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} selectPizza={selectPizza} />
        ))}
      </Grid>
      <div style={{ display: 'flex', margin: '20px', justifyContent: 'space-around' }}>
        <Button
          variant="outlined"
          disabled={!data.pizzas.hasNextPage}
          onClick={() =>
            fetchMore({
              variables: { input: { cursor: data.pizzas.cursor, limit: 5 } },
              updateQuery: updatePizzasQuery,
            })
          }
        >
          More pizzas
        </Button>
      </div>
      <PizzaModal selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} open={open} setOpen={setOpen} />
    </>
  );
};

export default PizzaList;
