import {
  Avatar,
  Button,
  Card,
  Col,
  Pagination,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
  type TableColumnsType,
} from 'antd';
import {Link} from 'react-router-dom';
import {toast} from 'sonner';
import type {TQueryParams, TFaculty} from '../../../../types';
import {useState} from 'react';
import {PHSearch} from '../../../../components/form/PHSearch';
import Loading from '../../../../components/shared/Loading';
import PHSort from '../../../../components/form/PHSort';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {
  useDeleteFacultyMutation,
  useGetAllFacultyQuery,
} from '../../../../redux/api/facultyApi';
import {sortOptionsDepartment} from '../../../../constant';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {FaPlus} from 'react-icons/fa';
import BreadcrumbSection from '../../../../components/ui/BreadcrumbSection';
import EditActionBtn from '../../../../components/ui/EditActionBtn';
import DeleteActionBtn from '../../../../components/ui/DeleteActionBtn';
const {Title, Text} = Typography;

const FacultyManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);

  const [deleteFaculty, {isLoading: deleteLoading}] =
    useDeleteFacultyMutation();

  const {
    data: faculties,
    isFetching,
    isLoading,
  } = useGetAllFacultyQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  if (isLoading) return <Loading />;

  const meta = faculties?.meta;

  const data = faculties?.data?.map((faculty: TFaculty) => ({
    key: faculty._id,
    action: faculty,
    id: faculty.id,
    profileImage: faculty.profileImage,
    name: `${faculty.name.firstName} ${faculty.name.middleName || ''} ${
      faculty.name.lastName
    }`,
    email: faculty.email,
    academicFaculty: faculty.academicFaculty.name,
    department: faculty.department.name,
    designation: faculty.designation,
    contact: faculty.contact,
    status: faculty.isDeleted ? 'INACTIVE' : 'ACTIVE',
  }));

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFaculty(id).unwrap();
      if (res?.success) toast.success('Faculty deleted successfully!');
      else toast.error(res?.message || 'Delete failed!');
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  };

  const columns: TableColumnsType<TFaculty> = [
    {
      title: 'Faculty',
      dataIndex: 'action',
      width: 280,
      render: (faculty: TFaculty) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} src={faculty.profileImage} />
          <div className="leading-tight">
            <Text className="!text-gray-900 !font-semibold">{faculty.id}</Text>
            <div className="text-xs !text-gray-500">
              {faculty.name.firstName} {faculty.name.middleName}{' '}
              {faculty.name.lastName}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 220,
      render: (val: string) => (
        <Tooltip title={val}>
          <Text className="!text-gray-700">{val}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',
      width: 200,
      render: (val: string) => <Text className="!text-gray-700">{val}</Text>,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      width: 180,
      render: (val: string) => <Text className="!text-gray-700">{val}</Text>,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      width: 150,
      render: (val: string) => <Text className="!text-gray-700">{val}</Text>,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      width: 150,
      render: (val: string) => <Text className="!text-gray-700">{val}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 140,
      render: (status: string) => {
        const style =
          status === 'ACTIVE'
            ? {icon: <CheckCircleOutlined />, color: 'success'}
            : {icon: <CloseCircleOutlined />, color: 'error'};
        return (
          <Tag
            icon={style.icon}
            color={style.color}
            className="px-2 py-[2px] !text-xs !font-semibold rounded-full"
            bordered={false}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 140,
      render: (faculty: TFaculty) => (
        <div className="flex items-center space-x-3">
          <EditActionBtn title="Faculty" />
          <DeleteActionBtn
            id={faculty._id}
            title="Faculty"
            onConfirm={handleDelete}
            loading={deleteLoading}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-primary-light p-6">
      <BreadcrumbSection home="User Management" sub="Faculties" />

      {/* Title */}
      <div className="rounded-2xl bg-gradient-to-r from-green-200 via-blue-200 to-indigo-200 p-[1px] shadow-lg mb-6">
        <div className="bg-primary-light rounded-2xl p-5">
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col>
              <div>
                <Title level={3} className="!m-0 text-gray-900">
                  Faculty Management
                </Title>
                <Text className="text-gray-500">
                  View, search and manage all faculty members in the university.
                </Text>
              </div>
            </Col>
            <Col>
              <Link to={'/admin/create-faculty'}>
                <Button
                  icon={<FaPlus className="text-sm" />}
                  type="primary"
                  size="large"
                  className="rounded-lg text-white shadow-sm transition-transform hover:scale-105">
                  Add Student
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-lg">
        <div>
          <PHSearch setParams={setParams} />
        </div>
        <div>
          <PHSort setParams={setParams} options={sortOptionsDepartment} />
        </div>
      </div>

      {/* Table */}
      <Card className="rounded-2xl shadow-lg">
        <Table
          columns={columns}
          dataSource={data}
          loading={isFetching}
          pagination={false}
          size="middle"
          sticky
          scroll={{x: 1200}}
          rowClassName={() => 'hover:bg-gray-50 transition-colors duration-150'}
          className="!border-0"
          locale={{
            emptyText: (
              <div className="py-10 text-center">
                <Title level={5} className="!mb-1">
                  No faculty found
                </Title>
                <Text className="!text-gray-500">
                  Try adjusting filters or add a new faculty member.
                </Text>
              </div>
            ),
          }}
        />

        {/* Pagination */}
        <div className="mt-5 flex justify-end">
          <Pagination
            current={page}
            onChange={(value) => setPage(value)}
            pageSize={meta?.limit}
            total={meta?.total}
            className="bg-white rounded-lg px-3 py-2 shadow-sm"
          />
        </div>
      </Card>
    </div>
  );
};

export default FacultyManagement;
