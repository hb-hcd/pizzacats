import { ObjectId } from 'mongodb';
import { Topping } from '../toppings/topping.provider.types';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  //toppings: [Topping];
  imgSrc: string;
  toppingIds: [ObjectId];
}
