import React from 'react';
import { Container } from '@material-ui/core';

import PageHeader from '../common/PageHeader';
import PizzaList from './PizzaList';

const Pizzas: React.FC = () => {
  return (
    <Container style={{ maxWidth: 'xl', justifyContent: 'center' }}>
      <PageHeader pageHeader={'Pizzas'} />
      <PizzaList />
    </Container>
  );
};

export default Pizzas;
