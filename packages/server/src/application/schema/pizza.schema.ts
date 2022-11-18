import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    imgSrc: String!
    toppings: [Topping!]!
    toppingIds: [String!]!
    priceCents: Int!
  }

  type Topping {
    id: ObjectID!
    name: String!
    priceCents: Int!
  }

  type Query {
    pizzas(input: QueryInput!): GetPizzasResponse!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    updatePizza(input: UpdatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [ObjectID!]!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    imgSrc: String
    toppingIds: [ObjectID!]
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input QueryInput {
    cursor: String!
    limit: Int!
  }

  type GetPizzasResponse {
    results: [Pizza!]!
    totalCount: Int!
    hasNextPage: Boolean!
    cursor: String!
  }
`;
export { typeDefs };
