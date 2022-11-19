import { ObjectId } from 'mongodb';
import { Topping } from '../toppings/topping.provider.types';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  imgSrc: string;
  toppings: Topping[];
  toppingIds: string[];
  priceCents: number;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: ObjectId[];
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  imgSrc?: string | null;
  toppingIds?: ObjectId[] | null;
}

export interface DeleteToppingInput {
  id: string;
}

export interface GetPizzasResponse {
  results: Pizza[];
  totalCount: number;
  hasNextPage: boolean;
  cursor: string;
}
