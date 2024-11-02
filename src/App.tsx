import "./App.css";
import Home from './containers/Home/Home.tsx';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import AddOrEditForm from './containers/AddOrEditForm/AddOrEditForm.tsx';

const App = () => {
  return <>
      <Layout> <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addNewMeal" element={<AddOrEditForm/>}/>
        <Route path="/editDish/:id" element={<AddOrEditForm isEdit={true}/>}/>
        <Route path="*" element={<h1>Not found</h1>}/>
      </Routes></Layout>
    </>;
};

export default App;
