import ButtonLoading from '../UI/ButtonLoading/ButtonLoading';
import { useEffect, useState } from 'react';
import { IFormData } from '../../types';
import axiosAPI from '../../axiosAPI.ts';
import { useNavigate, useParams } from 'react-router-dom';

const initialForm = {
  timeOfMeal:"",
  description:'',
  calories: 0
};

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<IFormData>({
    ...initialForm,
  });
const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    const getPostToEdit = async ()=>{
      if(id){
        try{
          const response = await axiosAPI('meal/'+id+'.json');
          if(response.data){
            console.log(response.data);
            setForm({...response.data});
          }
        }
        catch (e){
          console.error(e);
        }
      }
      else{
        setForm({...initialForm});
      }
    };
    void getPostToEdit();
  }, [id]);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        try {
          setIsLoading(true);
          if(id){
            try{
              await axiosAPI.put(`meal/${id}'.json`, form );
            }
            catch (e){
              console.log(e);
            }
          }
          else{
            try{
              if (
                form.timeOfMeal.trim().length > 0 &&
                form.description.trim().length > 0 && form.calories >0
              ) {
                await axiosAPI.post("meal.json", { ...form });
                setForm({...initialForm});
                navigate("/");
              } else {
                alert("Fill in all fields");
              }
            }
            catch (e){
              console.error(e);
            }
          }

        } catch (e) {
          console.error(e);
        } finally {
            setIsLoading(false);
        }

  };
  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {

    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className='w-100 mx-auto '>
      <form onSubmit={onSubmit}>
        <h3 className='fs-3'>Add/edit meal</h3>
        <div className="form-group mb-4 mt-4">
          <select
            required
            value={form.timeOfMeal}
            onChange={onChangeField}
            name="timeOfMeal"
            className="form-select"
          >
            <option className="fs-5" value="" disabled>
              Select a time of meal
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Snack"> Snack</option>
            <option value="Lunch"> Lunch</option>
            <option value="Dinner">Dinner</option>
            ))
          </select>
        </div>

          <div className="form-group mb-4 ">
            <textarea
              value={form.description}
            placeholder='Meal description'
              name="description"
            onChange={onChangeField}
              className="form-control"
            />
          </div>

          <div className="form-group mb-4 w-25">
            <input
              value={form.calories}
              onChange={onChangeField}
              type="number"
      placeholder='calories'
              name="calories"
              min={0}
              className="form-control"
            />
          </div>
          <ButtonLoading text={'save'} isLoading={isLoading} isDisabled={isLoading}/>
      </form>
    </div>
);
};

export default Form;