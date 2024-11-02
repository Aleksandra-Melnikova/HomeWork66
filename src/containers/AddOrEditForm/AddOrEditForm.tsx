
import Form from '../../components/Form/Form.tsx';
import React from 'react';

interface Props {
  isEdit?: boolean;
}

const AddOrEditForm:React.FC<Props> = () => {
  return (
    <div>
      <Form/>
    </div>
  );
};

export default AddOrEditForm;