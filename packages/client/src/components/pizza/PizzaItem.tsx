import React from 'react'
import { Pizza } from '../../types'
import { ListItem, Theme } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
    pizza: Pizza
    price: number
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, ...props }) => {

    props.price = pizza.toppings.reduce((prev, curr) => prev + curr.priceCents, 0);
   

    return (
        <ListItem {...props}>
            <div>
                <img src={pizza.imgSrc} alt="" />
            </div>
            <div>
                <p data-testid={`pizza-name-${pizza.id}`} >
                    {pizza.name}
                </p>
                <p data-testid={`pizza-pirce-${pizza.id}`}>
                    {toDollars(props.price)}
                </p>
            </div>
        </ListItem>
    )
}

export default PizzaItem