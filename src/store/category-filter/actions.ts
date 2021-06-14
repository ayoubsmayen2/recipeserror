import { Recipe } from "../../models/Recipe";
import {
  CategoryFilterRequestAction,
  CategoryFilterSuccessAction,
  FILTER_SUCCESS,
  FILTER_REQUEST,
} from '../../store/category-filter/types';

export const categoryFilterRequest = (
  categoryName: string,
): CategoryFilterRequestAction => ({
  type: FILTER_REQUEST,
  payload: {
    categoryName,
  },
});

export const categoryFilterSuccess = (
  recipes: Recipe[],
): CategoryFilterSuccessAction => ({
  type: FILTER_SUCCESS,
  payload: {
    recipes,
  },
});
