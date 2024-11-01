import ButtonLoading from '../UI/ButtonLoading/ButtonLoading';
import { useState } from 'react';
import { IFormData } from '../../types';
import axiosAPI from '../../axiosAPI.ts';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  timeOfMeal:"",
  description:'',
  calories: 0
}
export interface IForm {
  isEdit?:boolean;
}
const Form:React.FC<IForm> = ({isEdit=false}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<IFormData>({
    ...initialForm,
  });
const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        try {
          if (
            form.timeOfMeal.trim().length > 0 &&
            form.description.trim().length > 0 && form.calories >0
          ) {
            setIsLoading(true);
          await axiosAPI.post("meal.json", { ...form });
          console.log(form);
          navigate("/");
          } else {
            alert("Fill in all fields");
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
    <div className='w-75 mx-auto'>
      <form onSubmit={onSubmit}>
        <h3>{isEdit ? 'Edit' : 'Add new'} meal</h3>
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
          <ButtonLoading text={isEdit ? 'Edit' : 'Add'} isLoading={isLoading} isDisabled={isLoading}/>

          {/*<button type="submit" disabled={isLoading} className="btn btn-primary d-flex align-items-center">*/}
          {/*  <span className='me-2'>{isEdit ? 'Edit' : 'Add'}</span>*/}
          {/*  {isLoading?<ButtonSpinner/>:null}*/}
          {/*</button>*/}
      </form>
    </div>
);
};

export default Form;