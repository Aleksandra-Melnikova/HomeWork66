import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IApiData, IDeleteLoading, IMeal } from '../../types';
import axiosAPI from "../../axiosAPI.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import MealItem from "../../components/MealItem/MealItem.tsx";

const Home = () => {
  const navigate = useNavigate();
  const onAddForm = () => {
    navigate("/addNewMeal");
  };
  const [mealInfo, setMealInfo] = useState<IMeal[]>([]);
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<IDeleteLoading>({
    process: false,
    id:''
  });


  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosAPI("meal.json");
      const mealsObjects: IApiData = response.data;
      if (mealsObjects) {
        const meals = Object.keys(response.data).map((mealID: string) => {
          return {
            id: mealID,
            calories: Number(mealsObjects[mealID].calories),
            description: mealsObjects[mealID].description,
            timeOfMeal: mealsObjects[mealID].timeOfMeal,
          };
        });

        setMealInfo(meals);
      }
      else{
        setMealInfo([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);




  const totalCalories = mealInfo.reduce((acc, meal) => {
    acc += meal.calories;
    return acc;
  }, 0);

  useEffect(() => {
    setTotal(totalCalories);
  }, [totalCalories]);

  const onDelete = async (meal: IMeal) => {
    if (meal.id) {
      try{
        setIsDeleteLoading({
          process: true,
          id:meal.id
        });

        await axiosAPI.delete("meal/" + meal.id + ".json");
      }
      catch(e){
        console.error(e);
      }
     finally {
        setIsDeleteLoading({process: false,
          id:meal.id});
      }
      void fetchData();
    }
  };

  const navigateEdit = useNavigate();
  const onEdit = (meal: IMeal) => {
    navigateEdit(`/editDish/${meal.id}`);
  };

  return (
    <div className=" fs-4 pt-4">
      <div className="row justify-content-between align-items-center mb-5">
        <span className="col-5 ms-3 fs-3">
          {" "}
          Total calories : <strong> {total} kkal</strong>
        </span>
        <button
          className="col-2 btn btn-primary fs-4"
          type="button"
          onClick={onAddForm}
        >
          {" "}
          Add new meal
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {mealInfo.length > 0 ? (
            <div className="container">
              {mealInfo.map((meal) => (
                <MealItem
                  isDeleteLoading={isDeleteLoading}
                  onEdit={() => onEdit(meal)}
                  timeOfMeal={meal.timeOfMeal}
                  calories={meal.calories}
                  description={meal.description}
                  key={meal.id}
                  onDelete={() => onDelete(meal)}
                />
              ))}
            </div>
          ) : (
            <p className='text-center'>No meals</p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
