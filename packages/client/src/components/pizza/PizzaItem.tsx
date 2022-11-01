import React from 'react';
import { Pizza } from '../../types';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CardItem from '../common/CardItem';
import { Typography } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

const useStyles = makeStyles(({ typography }: Theme) => ({
  container: {
    marginTop: '2rem',
  },
  img: {
    width: typography.pxToRem(350),
    height: typography.pxToRem(350),
  },
  info: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export interface PizzaItemProps {
  pizza: Pizza;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CardItem>
        <img src={pizza.imgSrc} className={classes.img} />
        <Typography data-testid={`pizza-name-${pizza.id}`} className={classes.info}>
          {pizza.name}
        </Typography>
        <Typography data-testid={`pizza-description-${pizza.id}`}>{pizza.description}</Typography>
        <Typography data-testid={`pizza-priceCents-${pizza.id}`}>{toDollars(pizza.priceCents)}</Typography>
      </CardItem>
    </div>
  );
};

export default PizzaItem;
