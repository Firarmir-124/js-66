import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Alert, LinearProgress} from "@mui/material";
import './MealSection.css';
import axiosApi from "../../axiosApi";
import {Meal, MealList} from "../../types";
import Card from "../../components/Card/Card";


const MealSection = () => {
  const [calories, setCalories] = useState(0);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loader, setLoader] = useState(false);

  const updateCardMeal = async () => {
    try {
      setLoader(true)

      const responseMeals = await axiosApi.get<MealList | null>('/meal.json');
      const meals = responseMeals.data;

      let newMeals:Meal[] = []

      if (meals) {
        newMeals = Object.keys(meals).map(id => {
          const meal = meals[id];

          return {
            ...meal,
            id
          }
        })
      }

      const sumCalories = newMeals.reduce((sum, calorie) => {
        return sum + calorie.calories
      }, 0)

      setCalories(sumCalories);
      setMeals(newMeals);
    } finally {
      setLoader(false);
    }
  }

  const fetchMeals = useCallback(async () => {
    await updateCardMeal()
  }, [])

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals])


  return (
    <>
      <div className="topMain">
        <p>Количество калорий: <span>{calories} kcal</span></p>
        <NavLink className='btnAdd' to='/add-dish'>Добавить блюдо</NavLink>
      </div>
      <div className="bottomMain">
        {!loader ?
          (
            meals.length !== 0 ? meals.sort((a, b) => Date.parse(b.data) - Date.parse(a.data)).map(meal => (
              <Card updateCardMeal={updateCardMeal} key={meal.id} meal={meal}/>
            )) : <Alert sx={{m: 5}} severity="info">Список пуст !</Alert>
          ) : <LinearProgress sx={{height: 10}} color="secondary" />
        }
      </div>
    </>
  );
};

export default MealSection;