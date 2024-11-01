import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const onAddForm = ()=>{
    navigate("/addNewMeal");
  }
  return (
    <div className=' fs-4 pt-4'>
      <div className='row justify-content-between align-items-center mb-5'>
        <span className='col-3'> Total calories : <strong> 0 kkal</strong></span>
        <button  className='col-2 btn btn-primary' type='button' onClick={onAddForm}> Add new meal</button>

      </div>
      sadhghdfg
    </div>
  );
};

export default Home;