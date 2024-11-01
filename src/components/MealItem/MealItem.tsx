
export interface MealItem {
  timeOfMeal:string;
  description:string;
  calories: number
}
const MealItem:React.FC<MealItem> = ({timeOfMeal,  description,calories}) => {
  return (
    <div className='d-flex gap-2 mt-3 align-items-center'>
      <div className='col-8 text-start'>
        <div>{timeOfMeal}</div>
        <div>{ description}</div>
      </div>
      <div className='col-2 text-end'>
        <strong>{calories} kkal</strong>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>


    </div>
  );
};

export default MealItem;