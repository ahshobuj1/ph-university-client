import {Button, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import type {TResponse} from '../../../../types';
import PHInput from '../../../../components/form/PHInput';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {BsFillPenFill} from 'react-icons/bs';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {useAddAcademicFacultyMutation} from '../../../../redux/api/academicFacultyApi';

const CreateAcademicFacultyModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [addAcademicFaculty, {isLoading: deleteLoading}] =
    useAddAcademicFacultyMutation();

  const handleSubmit = async (values: FieldValues) => {
    setError('');
    try {
      const res = (await addAcademicFaculty(values).unwrap()) as TResponse;

      if (res?.success) {
        toast.success('Academic Faculty is created successfully!');
        setModalOpen(false);
      } else {
        const message = res?.message;
        setError(message);
        toast.error(message);
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div>
      <Button
        icon={<BsFillPenFill />}
        type="primary"
        size="large"
        onClick={() => setModalOpen(true)}>
        Add Academic Faculty
      </Button>

      <PHModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Create Academic Faculty For Your University">
        <div className="pt-2">
          {error ? <ErrorMessage error={error} /> : ''}

          <PHForm onSubmit={handleSubmit}>
            <PHInput name="name" placeholder="Academic Faculty Name" />

            <Row justify="end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={deleteLoading}>
                Create Academic Faculty
              </Button>
            </Row>
          </PHForm>
        </div>
      </PHModal>
    </div>
  );
};

export default CreateAcademicFacultyModal;
