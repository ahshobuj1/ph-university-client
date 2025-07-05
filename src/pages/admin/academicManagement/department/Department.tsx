import {Button, Table, type TableColumnsType} from 'antd';
import {useGetAllDepartmentQuery} from '../../../../redux/features/admin/departmentApi';
import type {TDepartment, TDepartmentTable} from '../../../../types';
import {AiOutlineDelete} from 'react-icons/ai';
import {BiEdit} from 'react-icons/bi';

const Department = () => {
  const {data: departmentData, isFetching} =
    useGetAllDepartmentQuery(undefined);

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
      filters: departmentData?.data?.map((item: TDepartment) => ({
        text: item.name,
        value: item.name,
      })),
    },
    {
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',
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
