import { Dispatch } from 'redux';

import { Recipe } from "../../models/Recipe"
import TheMealDBService from '../../services/themealdb.service';
import * as CategoryFilterActions from '../../store/category-filter/actions';

export const filter = (categoryName: string) => async (
  dispatch: Dispatch,
): Promise<void> => {
  dispatch(CategoryFilterActions.categoryFilterRequest(categoryName));

  const recipeSimples = await TheMealDBService.filterByCategory(categoryName);

  const recipes = await Promise.all(
    recipeSimples.map((simple) => TheMealDBService.findById(simple.id)),
  );

  dispatch(
    CategoryFilterActions.categoryFilterSuccess(
      recipes.filter((recipe) => !!recipe) as Recipe[],
    ),
  );
};
