import {Pagination, Table, type TableColumnsType} from 'antd';
import type {
  TDepartment,
  TDepartmentTable,
  TQueryParams,
} from '../../../../types';
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
import BreadcrumbSection from '../../../../components/ui/BreadcrumbSection';
import DeleteActionBtn from '../../../../components/ui/DeleteActionBtn';
import EditActionBtn from '../../../../components/ui/EditActionBtn';

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
        <div className="flex items-center space-x-3">
          <EditActionBtn title="Department" />
          <DeleteActionBtn
            id={item._id}
            title="Department"
            onConfirm={handleDelete}
            loading={deleteLoading}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-primary-light rounded-lg">
      <BreadcrumbSection home="Academic Management" sub="Department" />

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
