import {
  Breadcrumb,
  Pagination,
  Popconfirm,
  Table,
  type TableColumnsType,
} from 'antd';
import type {
  TDepartment,
  TDepartmentTable,
  TQueryParams,
} from '../../../../types';
import {BiEdit} from 'react-icons/bi';
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  HomeOutlined,
  BookOutlined,
} from '@ant-design/icons';
import {useState} from 'react';
import {PHSearch} from '../../../../components/form/PHSearch';
import Loading from '../../../../components/shared/Loading';
import PHSort from '../../../../components/form/PHSort';
import {sortOptionsDepartment} from '../../../../constant';
import {
  useDelDepartmentMutation,
  useGetAllDepartmentQuery,
} from '../../../../redux/api/departmentApi';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {toast} from 'sonner';
import CreateDepartmentModal from './CreateDepartmentModal';

const Department = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteDepartment, {isLoading: deleteLoading}] =
    useDelDepartmentMutation();

  const {
    data: departmentData,
    isFetching,
    isLoading,
  } = useGetAllDepartmentQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDepartment(id).unwrap();
      if (res?.success) {
        toast.success('Department deleted successfully!');
      } else {
        toast.error(res?.message);
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) return <Loading />;

  const meta = departmentData?.meta;

  const data: TDepartmentTable[] = departmentData?.data?.map(
    (item: TDepartment) => ({
      key: item._id,
      department: item.name,
      faculty: item.academicFaculty.name,
      action: item,
    })
  );

  const columns: TableColumnsType<TDepartmentTable> = [
    {
      title: 'Department',
      dataIndex: 'department',
      render: (text) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => (
        <div className="flex space-x-3">
          <Popconfirm
            title="Update Department"
            description="Are you sure to update this department?"
            okText="Update"
            cancelText="Cancel"
            icon={<QuestionCircleOutlined style={{color: 'red'}} />}
            placement="topRight">
            <span className="cursor-pointer bg-primary-light hover:bg-blue-100 text-blue-700 p-2 rounded-lg shadow-md transition-transform hover:scale-110">
              <BiEdit size={18} />
            </span>
          </Popconfirm>

          <Popconfirm
            title="Delete Department"
            description="Are you sure to delete this department?"
            onConfirm={() => handleDelete(item._id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{loading: deleteLoading}}
            icon={<QuestionCircleOutlined style={{color: 'red'}} />}
            placement="topLeft">
            <span className="cursor-pointer bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-lg shadow-md transition-transform hover:scale-110">
              <DeleteOutlined />
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-primary-light rounded-lg">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="">
            <HomeOutlined /> <span>Academic Management</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <BookOutlined /> <span>Department</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          Department
        </h2>
        <CreateDepartmentModal />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div>
          <PHSearch setParams={setParams} />
        </div>
        <div>
          <PHSort setParams={setParams} options={sortOptionsDepartment} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <Table<TDepartmentTable>
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isFetching}
          scroll={{x: 'max-content'}}
          rowClassName={() =>
            'hover:bg-gray-50 transition-colors cursor-pointer'
          }
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={meta?.limit}
          total={meta?.total}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Department;
