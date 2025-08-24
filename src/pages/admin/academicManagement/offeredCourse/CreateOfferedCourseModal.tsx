import {Button, Flex, Row} from 'antd';
import {useState} from 'react';
import PHModal from '../../../../components/shared/Modal/PHModal';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import PHSelect from '../../../../components/form/PHSelect';
import type {
  TAcademicFaculty,
  TCourse,
  TDepartment,
  TResponse,
  TSemesterRegistration,
} from '../../../../types';
import ErrorMessage from '../../../../components/shared/ErrorMessage';
import {
  useAddCourseMutation,
  useGetAllCourseQuery,
} from '../../../../redux/api/courseApi';
import {useGetAllAcademicFacultyQuery} from '../../../../redux/api/academicFacultyApi';
import {useGetAllDepartmentQuery} from '../../../../redux/api/departmentApi';
import {useGetAllRegisterSemesterQuery} from '../../../../redux/api/semesterRegistrationApi';
import {daysOptions} from '../../../../constant';
import PHTimePicker from '../../../../components/form/PHTimePicker';
import PHInput from '../../../../components/form/PHInput';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import ModalButton from '../../../../components/ui/ModalButton';

const CreateOfferedCourseModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');

  const [addCourse, {isLoading: addingCourse}] = useAddCourseMutation();

  const {data: academicFacultyData, isLoading: academicFacultyLoading} =
    useGetAllAcademicFacultyQuery(undefined);

  const {data: department} = useGetAllDepartmentQuery(
    [{name: 'academicFaculty', value: selectedFaculty}],
    {skip: !selectedFaculty}
  );

  const {data: semesterRegistration, isLoading: semesterRegistrationLoading} =
    useGetAllRegisterSemesterQuery(undefined);

  const {data: courseData, isLoading: courseLoading} =
    useGetAllCourseQuery(undefined);

  // const [registerSemester, {isLoading}] = useRegisterSemesterMutation();

  const academicFacultyOptions = academicFacultyData?.data?.map(
    (item: TAcademicFaculty) => ({
      value: item._id,
      label: item.name,
    })
  );

  const departmentOptions = department?.data?.map((item: TDepartment) => ({
    value: item._id,
    label: item.name,
  }));

  const semesterRegistrationOptions = semesterRegistration?.data?.map(
    (item: TSemesterRegistration) => ({
      value: item._id,
      label: `${item.semester.name} ${item.semester.year} - ${item.status}`,
    })
  );

  const courseOptions = courseData?.data?.map((item: TCourse) => ({
    value: item._id,
    label: `${item.prefix} - ${item.title}`,
  }));

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);

    // ** TODO -------------------------------------------------

    setError('');
    try {
      const res = (await addCourse(values).unwrap()) as TResponse;
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
      <ModalButton title="Offered Course" modalOpen={setModalOpen} />

      <PHModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Create Offered Course For Your University">
        <div className="pt-2">
          {error ? <ErrorMessage error={error} /> : ''}

          <PHForm onSubmit={handleSubmit}>
            <PHSelect
              options={academicFacultyOptions}
              name="academicFaculty"
              placeholder="Select Academic faculty"
              onChange={(value) => setSelectedFaculty(value)}
              disabled={academicFacultyLoading}
            />

            <PHSelect
              options={departmentOptions}
              name="department"
              placeholder="Select Academic Department"
              disabled={!selectedFaculty}
            />

            <PHSelect
              options={semesterRegistrationOptions}
              name="semesterRegistration"
              placeholder="Select Semester Registration"
              disabled={semesterRegistrationLoading}
            />
            <PHSelect
              options={courseOptions}
              name="semesterRegistration"
              placeholder="Select Semester Registration"
              disabled={courseLoading}
            />
            <PHSelect
              mode="multiple"
              options={daysOptions}
              name="days"
              placeholder="Select Days"
            />

            <Flex justify="space-between">
              <PHInput name="maxCapacity" placeholder="Max Capacity" />
              <PHInput name="section" placeholder="Section" />
            </Flex>

            <Flex justify="space-evenly">
              <PHTimePicker name="startTime" placeholder="Set start time" />
              <PHTimePicker name="endTime" placeholder="Set end time" />
            </Flex>

            <Row justify="end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={addingCourse}>
                Create Offered Course
              </Button>
            </Row>
          </PHForm>
        </div>
      </PHModal>
    </div>
  );
};

export default CreateOfferedCourseModal;
