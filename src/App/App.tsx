import React from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import AddDishAndEdit from "../containers/AddDishAndEdit/AddDishAndEdit";
import MealSection from "../containers/MealSection/MealSection";
import {Container, Paper} from "@mui/material";

function App() {
  return (
    <Container>
      <div className='header'>
        <Link to='/'>Calorie tracker</Link>
      </div>
      <Paper elevation={3} sx={{height: '90vh'}} className='main'>
        <Routes>
          <Route path='/' element={(
            <MealSection/>
          )}/>

          <Route path='/add-dish' element={(
            <AddDishAndEdit/>
          )}/>

          <Route path='/add-dish/:id' element={(
            <AddDishAndEdit/>
          )}/>
        </Routes>
      </Paper>
    </Container>
  );
}

export default App;
