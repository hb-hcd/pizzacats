import { Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../..//entities/pizza';
import { Pizza } from '../pizzas/pizza.provider.types';

class CursorProvider {
  constructor(private collection: Collection<PizzaDocument>) {}
  public async getCursorIndex(cursor: string | null): Promise<number> {
    if (cursor === null) return -1;
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    const index = pizzas.findIndex((element) => cursor === element._id.toHexString());
    return index;
  }

  public async getCursorResult(
    cursor: string | null,
    limit: number | 3
  ): Promise<{ results: Pizza[]; hasNextPage: boolean; cursor: string; totalCount: number }> {
    const allPizzas = await this.collection.find().sort({ name: 1 }).toArray();
    let index = await this.getCursorIndex(cursor);
    let startIndex = index < 0 ? 0 : index + 1;
    const hasNextPage = startIndex + limit < allPizzas.length;
    const results = allPizzas.map(toPizzaObject).slice(startIndex, startIndex + limit);
    cursor = results[results.length - 1].id;
    const totalCount = allPizzas.length;
    return {
      results,
      hasNextPage,
      cursor,
      totalCount,
    };
  }
}

export { CursorProvider };
