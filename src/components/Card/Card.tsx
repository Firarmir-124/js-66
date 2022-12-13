import React, {useState} from 'react';
import {ButtonGroup, Chip, CircularProgress, IconButton, Paper, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Meal} from "../../types";
import {Link} from "react-router-dom";
import axiosApi from "../../axiosApi";

interface Props {
  meal: Meal;
  updateCardMeal: () => void;
}

const Card:React.FC<Props> = ({meal, updateCardMeal}) => {
  const [btnRemoveLoader, setBtnRemoveLoader] = useState(false);

  const removeMeal = async (id: string) => {
    try {
      setBtnRemoveLoader(true);

      await axiosApi.delete('/meal/' + id + '.json');
      updateCardMeal();

    } finally {
      setBtnRemoveLoader(false);
    }
  }

  return (
    <Paper
      sx={
      {
        m: '20px',
        p: '20px',
        borderRadius: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      elevation={8}
      square
    >
      <Stack direction="column" spacing={1}>
        <Chip className='category' icon={<StyleOutlinedIcon />} label={meal.category} />
        <Chip className='dish'  icon={<FastfoodOutlinedIcon />} label={meal.dish} />
      </Stack>


      <Stack direction="row">
        <Chip sx={{mr: '10px'}} className='data' label={meal.data} />
        <Chip label={"Calories " + meal.calories} variant="outlined"/>
      </Stack>

      <ButtonGroup orientation='vertical'>
        <IconButton aria-label="delete" onClick={() => removeMeal(meal.id)} disabled={btnRemoveLoader}>
          {!btnRemoveLoader ? <DeleteIcon /> : <CircularProgress size={20} color="secondary" />}
        </IconButton>
        <IconButton>
          <Link to={'/add-dish/' + meal.id}><EditOutlinedIcon /></Link>
        </IconButton>
      </ButtonGroup>
    </Paper>
  );
};

export default Card;