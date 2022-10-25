import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PIZZAS } from '../../hooks/graphql/topping/queries/get-pizzas'
import CardItemSkeleton from '../common/CardItemSkeleton'
import PizzaItem from './PizzaItem'
import { Pizza } from '../../types'
import { Container, createStyles, List, ListItem, Theme } from '@material-ui/core';

const PizzaList = () => {
  const {loading, error, data} = useQuery(GET_PIZZAS);
  if(loading){
    return (

        data.pizzas.map((pizza: Pizza)=>{
            <CardItemSkeleton/>
        })
    )
  }
  if(error){
    return (
        <div>d</div>
    )
  }
  return (
    <div>
        piaalist
    </div>
  )
}

export default PizzaList