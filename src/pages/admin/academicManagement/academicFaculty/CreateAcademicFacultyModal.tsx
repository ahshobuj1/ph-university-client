import {Button, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import type {TResponse} from '../../../../types';
import PHInput from '../../../../components/form/PHInput';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {useAddAcademicFacultyMutation} from '../../../../redux/api/academicFacultyApi';
import ModalButton from '../../../../components/ui/ModalButton';

const CreateAcademicFacultyModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [addAcademicFaculty, {isLoading: submitLoading}] =
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
      <ModalButton modalOpen={setModalOpen} title="Add Academic Faculty" />

      {/* Modal */}
      <PHModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Add Academic Faculty">
        <div className="pt-2 space-y-4">
          {/* Error Message */}
          <ErrorMessage error={error} />

          {/* Form */}
          <PHForm onSubmit={handleSubmit}>
            <PHInput name="name" placeholder="Academic Faculty Name" />

            <Row justify="end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={submitLoading}
                className="rounded-lg shadow-sm transition-transform hover:scale-105">
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
