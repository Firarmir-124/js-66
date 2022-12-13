import React, {useState} from 'react';
import './Form.css';
import {ApiMeal, MealMutation} from "../../types";
import {Button, CircularProgress, TextField} from "@mui/material";

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  isLoading: boolean;
  meal?: MealMutation;
}

const Form:React.FC<Props> = ({onSubmit, isLoading, meal}) => {
  const [value, setValue] = useState<MealMutation>(meal || {
    category: '',
    dish: '',
    calories: '',
    data: '',
  })

  const onChange = (e:React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const {name, value} = e.target;
    setValue(prev => ({...prev, [name]:value}));
  }

  const onSubmitForm = (e:React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...value,
      calories: parseFloat(value.calories),
    })
  }

  return (
    <form className='form' onSubmit={onSubmitForm}>
      <div className="col">
        <select name="category" value={value.category} onChange={onChange} required>
          <option value="" disabled>Выбрать:</option>
          <option value="breakfast">Breakfast</option>
          <option value="snack">Snack</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <div className="col">
          <TextField
            variant="outlined"
            type="number"
            name='calories'
            label='каллорий'
            value={value.calories}
            onChange={onChange}
            required
          />
        </div>

      </div>

      <div className="col">
        <TextField
          variant="outlined"
          type="text"
          name='dish'
          label='Название еды'
          value={value.dish}
          onChange={onChange}
          sx={{width: '100%', mt: 2}}
          required
        />
      </div>

      <div className="col">
        <label htmlFor="data">Дата: </label>
        <input
          type="date"
          name='data'
          id='data'
          value={value.data}
          onChange={onChange}
          required
        />
      </div>

      <Button
        type='submit'
        sx={{width: 100, height: 50, mt: '20px',}}
        variant="outlined"
        disabled={isLoading}
        startIcon={ isLoading ? <CircularProgress size={20} color="secondary" /> : null}
      >
        {meal ? 'edit' : 'save'}
      </Button>

    </form>
  );
};

export default Form;