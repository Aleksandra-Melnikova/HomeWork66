import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IApiData, IMeal } from '../../types';
import axiosAPI from '../../axiosAPI.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import MealItem from '../../components/MealItem/MealItem.tsx';

const Home = () => {
  const navigate = useNavigate();
  const onAddForm = ()=>{
    navigate("/addNewMeal");
  };
  const [mealInfo, setMealInfo] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        await axiosAPI("meal.json");
      const quotesObjects:IApiData = response.data;
      if (quotesObjects) {
        const meals = Object.keys(response.data).map((mealID: string) => {
          return{
            id:mealID,
            ...quotesObjects[mealID],
          };
        });
        setMealInfo(meals);

      }
    }
    catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
 void fetchData();
  }, [fetchData]);

  const onDelete = async (meal: IMeal) => {
    if (meal.id) {
      await axiosAPI.delete("meal/" + meal.id + ".json");
      void fetchData();
    }
  };
  const navigateEdit = useNavigate();
  const onEdit = (meal: IMeal) => {
    navigateEdit(`/editDish/${meal.id}`);
  };


  return (
    <div className=' fs-4 pt-4'>
      <div className='row justify-content-between align-items-center mb-5'>
        <span className='col-3 ms-3 fs-3'> Total calories : <strong> 0 kkal</strong></span>
        <button  className='col-2 btn btn-primary fs-4' type='button' onClick={onAddForm}> Add new meal</button>

      </div>
       {loading ? (
          <Spinner />
        ) : (
          <>
            {mealInfo.length > 0 ? (
              <div className="container">
                {mealInfo.map((meal) => (
                  <MealItem onEdit={()=>onEdit(meal)} timeOfMeal={meal.timeOfMeal} calories={meal.calories}  description={meal.description} key={meal.id} onDelete={()=>onDelete(meal)} />
                ))}
              </div>
            ) : (
              <p>In this category no quotes</p>
            )}
          </>
        )}
    </div>
  );
};

export default Home;