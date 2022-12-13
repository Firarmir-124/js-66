import React, {useCallback, useEffect, useState} from 'react';
import './AddDishAndEdit.css';
import Form from "../../components/Form/Form";
import {ApiMeal, Meal, MealMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const AddDishAndEdit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState<MealMutation | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const fetchMeal = useCallback(async () => {
    try {
      setLoadingEdit(true);
      const responseMeal = await axiosApi.get<MealMutation | null>('/meal/' + id + '.json');
      setMeal(responseMeal.data);

    } finally {
      setLoadingEdit(false);
    }
  }, [id])

  useEffect(() => {
    if (id) {
      void fetchMeal();
    }
  }, [id, fetchMeal])

  const onSubmit = async (meal: ApiMeal) => {
    try {
      setLoading(true);

      if (!id) {
        await axiosApi.post<Meal>('/meal.json', meal);
        navigate('/')
      } else {
        await axiosApi.put<Meal>('/meal/' + id + '.json', meal);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='block-form'>
        <h1>{!id ? 'Добавить еду' : 'Изменить еду'}</h1>
        { !loadingEdit ?

          !id ? <Form isLoading={loading} onSubmit={onSubmit}/> :
            meal && <Form isLoading={loading} onSubmit={onSubmit} meal={meal}/>

          : <CircularProgress size={200} color="secondary" />
        }
      </div>
    </>
  );
};

export default AddDishAndEdit;