import {Button, Table, type TableColumnsType} from 'antd';
import type {
  TAcademicFaculty,
  TDepartment,
  TDepartmentTable,
} from '../../../../types';
import {AiOutlineDelete} from 'react-icons/ai';
import {BiEdit} from 'react-icons/bi';
import {useGetAllDepartmentQuery} from '../../../../redux/api/departmentApi';
import {useGetAllAcademicFacultyQuery} from '../../../../redux/api/academicFacultyApi';

// import type {TQueryParams} from '../semester/Semester';

const Department = () => {
  const {data: departmentData, isFetching} =
    useGetAllDepartmentQuery(undefined);

  const {data: academicFacultyData} = useGetAllAcademicFacultyQuery(undefined);

  const data: TDepartmentTable[] = departmentData?.data?.map(
    (item: TDepartment) => ({
      key: item._id,
      _id: item._id,
      name: item.name,
      academicFaculty: item.academicFaculty.name,
    })
  );

  const columns: TableColumnsType<TDepartmentTable> = [
    {
      title: 'Department',
      dataIndex: 'name',
    },
    {
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',
      filters: academicFacultyData?.data?.map((item: TAcademicFaculty) => ({
        text: item.name,
        value: item.name,
      })),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: () => {
        return (
          <div className="space-x-5 flex">
            <Button color="primary" variant="filled">
              <BiEdit />
            </Button>
            <Button color="danger" variant="filled">
              <AiOutlineDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  // const onChange: TableProps<DataType>['onChange'] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log('params', pagination, filters, sorter, extra);

  //   if (extra.action === 'filter') {
  //     const queryParam: TQueryParams[] = [];
  //   }
  // };

  return (
    <div className="overflow-x-auto">
      <Table<TDepartmentTable>
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isFetching}
        // onChange={onChange}
        scroll={{x: 'max-content'}}
      />
    </div>
  );
};

export default Department;
