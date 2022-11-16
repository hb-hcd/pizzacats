import React from 'react';
import { Pizza } from '../../types';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CardItem from '../common/CardItem';
import { Typography } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';
import makePizza from '../../assets/img/make-pizza.jpeg';
import { AddCircle } from '@material-ui/icons';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const useStyles = makeStyles(({ typography }: Theme) => ({
  container: {
    marginTop: '2rem',
    width: typography.pxToRem(450),
    position: 'relative',
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
  bgImage: {
    backgroundImage: `url(${makePizza})`,
    position: 'relative',
    alignContent: 'center',
    backgroundSize: 'contain',
    width: typography.pxToRem(350),
    height: typography.pxToRem(360),
    justifyContent: 'center',
    textAlign: 'center',
  },
  btn: {
    size: 'medium',
    position: 'absolute',
    bottom: '0px',
  },
}));

export interface PizzaItemProps {
  pizza?: Pizza;
  selectPizza: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, selectPizza }) => {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={3} md={4} className={classes.container} data-testid={`pizza-item-${pizza?.id}`}>
      <CardItem>
        {pizza?.imgSrc ? (
          <img src={pizza?.imgSrc} className={classes.img} />
        ) : (
          <div className={classes.bgImage}>
            <AddCircle
              style={{
                color: 'white',
                position: 'absolute',
                bottom: '10px',
                fontSize: '40px',
                left: '45%',
                cursor: 'pointer',
              }}
              onClick={(): void => selectPizza(pizza)}
            />
          </div>
        )}
        <Typography data-testid={`pizza-name-${pizza?.id}`} className={classes.info}>
          {pizza?.name}
        </Typography>
        <Typography data-testid={`pizza-description-${pizza?.id}`}>{pizza ? pizza.description : ''}</Typography>
        <Typography data-testid={`pizza-priceCents-${pizza?.id}`}>
          {pizza?.priceCents && toDollars(pizza.priceCents)}
        </Typography>
        {pizza && (
          <Button variant="contained" className={classes.btn} onClick={(): void => selectPizza(pizza)}>
            Edit
          </Button>
        )}
      </CardItem>
    </Grid>
  );
};

export default PizzaItem;
