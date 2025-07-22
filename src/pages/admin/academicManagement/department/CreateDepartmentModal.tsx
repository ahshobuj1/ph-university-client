import {Button, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import type {TAcademicFaculty, TResponse} from '../../../../types';
import PHInput from '../../../../components/form/PHInput';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {BsFillPenFill} from 'react-icons/bs';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';

import {useAddDepartmentMutation} from '../../../../redux/api/departmentApi';
import PHSelect from '../../../../components/form/PHSelect';
import {useGetAllAcademicFacultyQuery} from '../../../../redux/api/academicFacultyApi';

const CreateDepartmentModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [addDepartment, {isLoading: deleteLoading}] =
    useAddDepartmentMutation();
  const {data: academicFaculty, isLoading: facultyLoading} =
    useGetAllAcademicFacultyQuery(undefined);

  const facultyOptions = academicFaculty?.data?.map(
    (faculty: TAcademicFaculty) => ({label: faculty.name, value: faculty._id})
  );

  const handleSubmit = async (values: FieldValues) => {
    setError('');
    try {
      const res = (await addDepartment(values).unwrap()) as TResponse;

      if (res?.success) {
        toast.success('Academic Department is created successfully!');
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
        Add Academic Department
      </Button>

      <PHModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Create Department For Your University">
        <div className="pt-2">
          {error ? <ErrorMessage error={error} /> : ''}

          <PHForm onSubmit={handleSubmit}>
            <PHInput name="name" placeholder="Academic Department Name" />
            <PHSelect
              options={facultyOptions}
              name="academicFaculty"
              placeholder="Academic Faculty Name"
              disabled={facultyLoading}
            />

            <Row justify="end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={deleteLoading}>
                Create Department
              </Button>
            </Row>
          </PHForm>
        </div>
      </PHModal>
    </div>
  );
};

export default CreateDepartmentModal;
