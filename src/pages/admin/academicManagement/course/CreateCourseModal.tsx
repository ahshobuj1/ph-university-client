import {Button, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import PHSelect from '../../../../components/form/PHSelect';
import type {TCourse} from '../../../../types';
import PHInput from '../../../../components/form/PHInput';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {BsFillPenFill} from 'react-icons/bs';
import {useGetAllCourseQuery} from '../../../../redux/api/courseApi';

const CreateCourseModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
      code: Number(values.code),
      credits: Number(values.credits),
    };

    console.log(data);

    setError('');
    // try {
    //   const res = (await registerSemester(data).unwrap()) as TResponse;

    //   if (res?.success) {
    //     toast.success('Semester Registered successfully!');
    //     setModalOpen(false);
    //   } else {
    //     const message = res?.message;
    //     setError(message);
    //     toast.error(message);
    //   }
    // } catch (err: unknown) {
    //   const message = getErrorMessage(err);
    //   toast.error(message);
    //   setError(message);
    // }
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
            // resolver={zodResolver(createSemesterRegistrationSchema)}
          >
            <PHInput name="title" placeholder="Course Title" />
            <PHInput name="prefix" placeholder="Course Prefix" />
            <PHInput name="code" placeholder="Course code" />
            <PHInput name="credits" placeholder="course credits" />
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
                // loading={isLoading}
              >
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
