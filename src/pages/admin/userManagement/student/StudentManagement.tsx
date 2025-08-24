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
import type {TQueryParams, TStudent} from '../../../../types';
import {useState} from 'react';
import {PHSearch} from '../../../../components/form/PHSearch';
import Loading from '../../../../components/shared/Loading';
import {sortOptionsDepartment} from '../../../../constant';
import PHSort from '../../../../components/form/PHSort';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {toast} from 'sonner';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from '../../../../redux/api/studentApi.admin';
import {Link} from 'react-router-dom';
import BreadcrumbSection from '../../../../components/ui/BreadcrumbSection';
import {FaPlus} from 'react-icons/fa';
import EditActionBtn from '../../../../components/ui/EditActionBtn';
import DeleteActionBtn from '../../../../components/ui/DeleteActionBtn';

const {Title, Text} = Typography;

const StudentManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteStudent, {isLoading: deleteLoading}] =
    useDeleteStudentMutation();

  const {
    data: students,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteStudent(id).unwrap();
      if (res?.success) {
        toast.success('Student deleted successfully!');
      } else {
        toast.error(res?.message || 'Delete failed!');
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const meta = students?.meta;

  const data = students?.data?.map((student: TStudent) => ({
    key: student._id,
    action: student,
    id: student.id,
    profileImage: student.profileImage,
    name: `${student.name.firstName} ${student.name.middleName || ''} ${
      student.name.lastName
    }`,
    email: student.email,
    course: student,
    academicFaculty: student.academicFaculty.name,
    department: student.department.name,
    semester: `${student.semester.name} ${student.semester.year}`,
    contact: student.contact,
    status: student.isDeleted ? 'INACTIVE' : 'ACTIVE',
  }));

  const columns: TableColumnsType<TStudent> = [
    {
      title: 'Student',
      dataIndex: 'action',
      width: 280,
      render: (student: TStudent) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} src={student.profileImage} />
          <div className="leading-tight">
            <Text className="!text-gray-900 !font-semibold">{student.id}</Text>
            <div className="text-xs !text-gray-500">
              {student.name.firstName} {student.name.middleName}{' '}
              {student.name.lastName}
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
      title: 'Semester',
      dataIndex: 'semester',
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
      render: (student: TStudent) => (
        <div className="flex items-center space-x-3">
          <EditActionBtn title="Department" />
          <DeleteActionBtn
            id={student._id}
            title="Department"
            onConfirm={handleDelete}
            loading={deleteLoading}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-primary-light p-6">
      <BreadcrumbSection home="User Management" sub="Students" />

      {/* Title */}
      <div className="rounded-2xl bg-gradient-to-r from-green-200 via-blue-200 to-indigo-200 p-[1px] shadow-lg mb-6">
        <div className="bg-primary-light rounded-2xl p-5">
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col>
              <div>
                <Title level={3} className="!m-0 text-gray-900">
                  Student Management
                </Title>
                <Text className="text-gray-500">
                  View, search and manage all students in the university.
                </Text>
              </div>
            </Col>
            <Col>
              <Link to={'/admin/create-student'}>
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
                  No students found
                </Title>
                <Text className="!text-gray-500">
                  Try adjusting filters or add a new student.
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

export default StudentManagement;
