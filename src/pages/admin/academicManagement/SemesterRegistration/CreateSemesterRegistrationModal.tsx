import {Button, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import PHSelect from '../../../../components/form/PHSelect';
import {useGetAllSemesterQuery} from '../../../../redux/api/semesterApi';
import type {TResponse, TSemester} from '../../../../types';
import PHDatePicker from '../../../../components/form/PHDatePicker';
import PHInput from '../../../../components/form/PHInput';
import {useRegisterSemesterMutation} from '../../../../redux/api/semesterRegistrationApi';
import {toast} from 'sonner';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {zodResolver} from '@hookform/resolvers/zod';
import {createSemesterRegistrationSchema} from '../../../../schemas';

const CreateSemesterRegistrationModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const [registerSemester, {isLoading}] = useRegisterSemesterMutation();
  const {data: semesterData} = useGetAllSemesterQuery([
    {name: 'sort', value: 'year'},
  ]);

  const semesterOptions = semesterData?.data?.map((item: TSemester) => ({
    value: item._id,
    label: item.name + ' ' + item.year,
  }));

  const handleSubmit = async (values: FieldValues) => {
    const data = {
      ...values,
      maxCredit: Number(values.maxCredit),
      minCredit: Number(values.minCredit),
    };

    setError('');
    try {
      const res = (await registerSemester(data).unwrap()) as TResponse;

      if (res?.success) {
        toast.success('Semester Registered successfully!');
        setModalOpen(false);
      } else {
        const message = res?.message;
        setError(message);
        toast.error(message);
      }
    } catch (err: any) {
      const message =
        err?.data?.message || err?.message || 'Something went wrong...!';

      toast.error(message);
      setError(message);
    }
  };

  return (
    <div>
      <Button type="primary" size="large" onClick={() => setModalOpen(true)}>
        Create Semester Registration
      </Button>

      <PHModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Create Semester Registration">
        <div className="pt-2">
          {error ? <ErrorMessage error={error} /> : ''}

          <PHForm
            onSubmit={handleSubmit}
            resolver={zodResolver(createSemesterRegistrationSchema)}>
            <PHSelect
              options={semesterOptions}
              name="semester"
              placeholder="Select Semester"
            />
            <PHDatePicker name="startDate" placeholder="Select start date" />
            <PHDatePicker name="endDate" placeholder="Select end date" />
            <PHInput name="minCredit" placeholder="Min Credit" />
            <PHInput name="maxCredit" placeholder="Max Credit" />

            <Row justify="end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}>
                Register Semester
              </Button>
            </Row>
          </PHForm>
        </div>
      </PHModal>
    </div>
  );
};

export default CreateSemesterRegistrationModal;
