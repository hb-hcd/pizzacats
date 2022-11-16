import React from 'react';
import { Pizza } from '../../types';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CardItem from '../common/CardItem';
import { Typography } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';
import makePizza from '../../assets/img/make-pizza.jpeg';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles(({ typography }: Theme) => ({
  container: {
    marginTop: '2rem',
    width: typography.pxToRem(450),
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
  pizza?: Pizza;
  selectPizza: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, selectPizza }) => {
  const classes = useStyles();

  return (
    <div className={classes.container} onClick={(): void => selectPizza(pizza)} data-testid={`pizza-item-${pizza?.id}`}>
      <CardItem>
        {pizza?.imgSrc ? (
          <img src={pizza?.imgSrc} className={classes.img} />
        ) : (
          <div style={{ position: 'relative', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <img src={makePizza} style={{ display: 'block', objectFit: 'contain', width: '400px', height: '400px' }} />
            <AddCircle style={{ color: 'white', position: 'absolute', bottom: '10px' }} />
          </div>
        )}
        <Typography data-testid={`pizza-name-${pizza?.id}`} className={classes.info}>
          {pizza?.name}
        </Typography>
        <Typography data-testid={`pizza-description-${pizza?.id}`}>{pizza?.description}</Typography>
        <Typography data-testid={`pizza-priceCents-${pizza?.id}`}>
          {pizza?.priceCents && toDollars(pizza.priceCents)}
        </Typography>
      </CardItem>
    </div>
  );
};

export default PizzaItem;
