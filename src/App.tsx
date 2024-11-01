import "./App.css";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';

const App = () => {
  return <>
      <Layout> <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addNewMeal" element={<NewOrEditMeal/>}/>
        <Route path="/editDish/:id" element={<NewOrEditMeal/>}/>
        <Route path="*" element={<h1>Not found</h1>}/>
      </Routes></Layout>
    </>;
};

export default App;
