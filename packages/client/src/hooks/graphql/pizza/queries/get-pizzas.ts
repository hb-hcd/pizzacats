import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas($input: QueryInput!) {
    pizzas(input: $input) {
      results {
        id
        name
        description
        imgSrc
        priceCents
        toppingIds
        toppings {
          id
          name
          priceCents
        }
      }
      hasNextPage
      totalCount
      cursor
    }
  }
`;

export { GET_PIZZAS };
