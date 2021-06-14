import {
  TOGGLE,
  MenuCategoryToggleAction,
} from '../../store/menu-category/types';

export const toggle = (): MenuCategoryToggleAction => ({
  type: TOGGLE,
});
