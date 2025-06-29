import {useGetAllSemesterQuery} from '../../../redux/features/semester/semesterApi';

const Semester = () => {
  const {data, error} = useGetAllSemesterQuery(undefined);

  console.log('data =>', data, 'error =>', error);

  return <div>Semester Component...!</div>;
};

export default Semester;
