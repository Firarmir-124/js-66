export interface Meal {
  id: string;
  category: string;
  dish: string;
  calories: number;
  data: string;
}

export type ApiMeal = Omit<Meal, 'id'>;

export interface MealMutation {
  category: string;
  dish: string;
  calories: string;
  data: string;
}

export interface MealList {
  [id: string]: ApiMeal
}