import {
  Breadcrumb,
  Pagination,
  Popconfirm,
  Table,
  type TableColumnsType,
} from 'antd';
import type {
  TAcademicFaculty,
  TAcademicFacultyTable,
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
import {
  useDelAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
} from '../../../../redux/api/academicFacultyApi';
import {PHSearch} from '../../../../components/form/PHSearch';
import Loading from '../../../../components/shared/Loading';
import CreateAcademicFacultyModal from './CreateAcademicFacultyModal';
import PHSort from '../../../../components/form/PHSort';
import {sortOptionsAcademicFaculty} from '../../../../constant';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteAFaculty, {isLoading: deleteLoading}] =
    useDelAcademicFacultyMutation();

  const {
    data: academicFacultyData,
    isFetching,
    isLoading,
  } = useGetAllAcademicFacultyQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAFaculty(id).unwrap();
      if (res?.success) {
        toast.success('Faculty deleted successfully!');
      } else {
        toast.error(res?.message);
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) return <Loading />;

  const meta = academicFacultyData?.meta;

  const data: TAcademicFacultyTable[] = academicFacultyData?.data?.map(
    (item: TAcademicFaculty) => ({
      key: item._id,
      _id: item._id,
      name: item.name,
      action: item,
    })
  );

  const columns: TableColumnsType<TAcademicFacultyTable> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => (
        <div className="flex space-x-3">
          <Popconfirm
            title="Update Faculty"
            description="Are you sure to update this faculty?"
            okText="Update"
            cancelText="Cancel"
            icon={<QuestionCircleOutlined style={{color: 'red'}} />}
            placement="topRight">
            <span className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-lg shadow-md transition-transform hover:scale-110">
              <BiEdit size={18} />
            </span>
          </Popconfirm>

          <Popconfirm
            title="Delete Faculty"
            description="Are you sure to delete this faculty?"
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
    <div className="p-6 bg-blue-50 rounded-lg">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="">
            <HomeOutlined /> <span>Academic Management</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <BookOutlined /> <span>Academic Faculty</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          Academic Faculty
        </h2>
        <CreateAcademicFacultyModal />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div>
          <PHSearch setParams={setParams} />
        </div>
        <div>
          <PHSort setParams={setParams} options={sortOptionsAcademicFaculty} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <Table<TAcademicFacultyTable>
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

export default AcademicFaculty;
