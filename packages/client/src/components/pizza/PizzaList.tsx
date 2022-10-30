import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import CardItemSkeleton from '../common/CardItemSkeleton';
import PizzaItem from './PizzaItem';
import { Pizza } from '../../types';
import { List } from '@material-ui/core';

const PizzaList: React.FC = () => {
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
        <h1>{error.message} occured</h1>
      </div>
    );
  }

  return (
    <List>
      {data.pizzas.map((pizza: Pizza) => (
        <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} />
      ))}
    </List>
  );
};

export default PizzaList;
