import {Button, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import PHSelect from '../../../../components/form/PHSelect';
import type {TCourse, TResponse} from '../../../../types';
import PHInput from '../../../../components/form/PHInput';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {BsFillPenFill} from 'react-icons/bs';
import {
  useAddCourseMutation,
  useGetAllCourseQuery,
} from '../../../../redux/api/courseApi';
import {createCourseSchema} from '../../../../schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';

const CreateCourseModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [addCourse, {isLoading: addingCourse}] = useAddCourseMutation();

  const {data: courseData} = useGetAllCourseQuery([
    {name: 'sort', value: 'title'},
  ]);

  // const [registerSemester, {isLoading}] = useRegisterSemesterMutation();

  const coursesOptions = courseData?.data?.map((item: TCourse) => ({
    value: item._id,
    label: item.title,
  }));

  const handleSubmit = async (values: FieldValues) => {
    const data = {
      ...values,
      preRequisiteCourses: (values?.preRequisiteCourses || []).map(
        (id: string) => ({
          course: id,
        })
      ),
    };

    setError('');
    try {
      const res = (await addCourse(data).unwrap()) as TResponse;
      console.log(res);

      if (res?.success) {
        toast.success('Course is created successfully!');
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
        Add Course
      </Button>

      <PHModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Create Course For Your University">
        <div className="pt-2">
          {error ? <ErrorMessage error={error} /> : ''}

          <PHForm
            onSubmit={handleSubmit}
            resolver={zodResolver(createCourseSchema)}>
            <PHInput name="title" placeholder="Course Title" />
            <PHInput name="prefix" placeholder="Course Prefix" />
            <PHInput name="code" placeholder="Course code" />
            <PHInput name="credits" placeholder="Course credits" />
            <PHSelect
              mode="multiple"
              options={coursesOptions}
              name="preRequisiteCourses"
              placeholder="Select PreRequisite Courses (Optional)"
            />

            <Row justify="end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={addingCourse}>
                Create Course
              </Button>
            </Row>
          </PHForm>
        </div>
      </PHModal>
    </div>
  );
};

export default CreateCourseModal;
