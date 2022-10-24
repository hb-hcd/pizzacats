import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    imgSrc: String!
    toppings: [Topping]
  }

  type Query {
    pizzas: [Pizza!]!
  }
`;
export { typeDefs };
