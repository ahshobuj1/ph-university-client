import {Button, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import type {TResponse} from '../../../../types';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {BsFillPenFill} from 'react-icons/bs';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import PHSelect from '../../../../components/form/PHSelect';
import {useAddSemesterMutation} from '../../../../redux/api/semesterApi';
import {
  monthOptions,
  semesterNameCode,
  semesterNameOptions,
  yearOptions,
} from '../../../../constant';

const CreateSemesterModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [addSemester, {isLoading: deleteLoading}] = useAddSemesterMutation();

  const handleSubmit = async (values: FieldValues) => {
    const semesterData = {
      ...values,
      code: semesterNameCode[values.name],
    };
    // console.log(semesterData);
    setError('');

    try {
      const res = (await addSemester(semesterData).unwrap()) as TResponse;

      if (res?.success) {
        toast.success('Academic Semester is created successfully!');
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
        Add Academic Semester
      </Button>

      <PHModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Create Semester For Your University">
        <div className="pt-2">
          {error ? <ErrorMessage error={error} /> : ''}

          <PHForm onSubmit={handleSubmit}>
            <PHSelect
              options={semesterNameOptions}
              name="name"
              placeholder="Select Semester Name"
            />
            <PHSelect
              options={yearOptions}
              name="year"
              placeholder="Select semester year"
            />
            <PHSelect
              options={monthOptions}
              name="startMonth"
              placeholder="Select semester start month"
            />
            <PHSelect
              options={monthOptions}
              name="endMonth"
              placeholder="Select semester end month"
            />

            <Row justify="end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={deleteLoading}>
                Create Semester
              </Button>
            </Row>
          </PHForm>
        </div>
      </PHModal>
    </div>
  );
};

export default CreateSemesterModal;
