import {useGetAllSemesterQuery} from '../../../../redux/features/admin/semesterApi';

const Semester = () => {
  const {data, error} = useGetAllSemesterQuery(undefined);

  console.log('data =>', data, 'error =>', error);

  return <div>Semester Component...!</div>;
};

export default Semester;
