import {Button, Row, Tag} from 'antd';
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

const CreateSemesterRegistrationModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<any>('');

  const [registerSemester] = useRegisterSemesterMutation();
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

    try {
      const res = (await registerSemester(data)) as TResponse;

      if (res?.data) {
        toast.success('Semester Registered successfully!');
        setModalOpen(false);
        setError('');
      }
      if (!res?.error) {
        setError(res?.error?.data?.message);
      }
    } catch (error: any) {
      throw new Error(error?.message || 'something went wrong!');
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
        <PHForm
          onSubmit={handleSubmit}
          defaultValues={{
            semester: '',
            startDate: null,
            endDate: null,
            minCredit: '',
            maxCredit: '',
          }}>
          <PHSelect
            options={semesterOptions}
            name="semester"
            label="Semester"
            placeholder="Select Semester"
          />

          <PHDatePicker
            name="startDate"
            label="Start Date"
            placeholder="Select start date"
          />
          <PHDatePicker
            name="endDate"
            label="End Date"
            placeholder="Select end date"
          />

          <PHInput name="minCredit" label="Min Credit" />
          <PHInput name="maxCredit" label="Max Credit" />

          <Row justify="space-between">
            <Button type="primary" htmlType="submit" size="large">
              Register Semester
            </Button>
          </Row>

          {error ? (
            <Tag
              color="error"
              bordered={false}
              style={{fontSize: '15px', marginTop: '10px'}}>
              {error}
            </Tag>
          ) : (
            ''
          )}
        </PHForm>
      </PHModal>
    </div>
  );
};

export default CreateSemesterRegistrationModal;
