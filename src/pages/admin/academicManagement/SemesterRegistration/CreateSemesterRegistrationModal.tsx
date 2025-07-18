import {Button} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';

const CreateSemesterRegistrationModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button type="primary" size="large" onClick={() => setOpen(true)}>
        Create Semester Registration
      </Button>

      <PHModal
        open={open}
        setOpen={setOpen}
        title="Create Semester Registration">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quae!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quae!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quae!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quae!
        </p>
      </PHModal>
    </div>
  );
};

export default CreateSemesterRegistrationModal;
