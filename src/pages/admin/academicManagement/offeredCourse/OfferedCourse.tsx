import {
  Avatar,
  Breadcrumb,
  Card,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  type TableColumnsType,
} from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {BiEdit} from 'react-icons/bi';

import type {TFaculty, TOfferedCourse, TQueryParams} from '../../../../types';
import {useState} from 'react';
import {PHSearch} from '../../../../components/form/PHSearch';
import Loading from '../../../../components/shared/Loading';
import {sortOptionsDepartment} from '../../../../constant';
import PHSort from '../../../../components/form/PHSort';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {toast} from 'sonner';
import {
  useDeleteOfferedCourseMutation,
  useGetAllOfferedCourseQuery,
} from '../../../../redux/api/offeredCourseApi';
import {
  ClockCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import CreateOfferedCourseModal from './CreateOfferedCourseModal';

const {Title, Text} = Typography;

const OfferedCourse = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteOfferedCourse, {isLoading: deleteLoading}] =
    useDeleteOfferedCourseMutation();

  const {
    data: offeredCourseData,
    isFetching,
    isLoading,
  } = useGetAllOfferedCourseQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteOfferedCourse(id).unwrap();
      if (res?.success) {
        toast.success('Offered course deleted successfully!');
      } else {
        const message = res?.message;
        toast.error(message);
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const meta = offeredCourseData?.meta;

  const data = offeredCourseData?.data?.map((item: TOfferedCourse) => ({
    key: item._id,
    action: item,
    faculty: item.faculty,
    department: item.department.name,
    academicFaculty: item.academicFaculty.name,
    status: item.semesterRegistration.status,
    course: item.course.prefix + ' - ' + item.course.code,
    capacity: item.maxCapacity,
    section: item.section,
    days: item.days,
    time: item.startTime + ' - ' + item.endTime,
  }));

  const columns: TableColumnsType<TOfferedCourse> = [
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      width: 260,
      render: (item: TFaculty) => (
        <div className="flex items-center gap-3">
          <Avatar size={36} src={item.profileImage} />
          <div className="leading-tight">
            <Text className="!text-gray-900 !font-semibold">{item.id}</Text>
            <div className="text-xs !text-gray-500">
              {item.name.firstName} {item.name.middleName} {item.name.lastName}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',
      width: 200,
      className: 'text-gray-700',
      render: (val: string) => <Text className="!text-gray-700">{val}</Text>,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      width: 180,
      render: (val: string) => <Text className="!text-gray-700">{val}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 140,
      render: (item) => {
        let style;
        if (item === 'ONGOING')
          style = {icon: <SyncOutlined spin />, color: 'processing'};
        if (item === 'UPCOMING')
          style = {icon: <ClockCircleOutlined spin />, color: 'cyan'};
        if (item === 'ENDED')
          style = {icon: <MinusCircleOutlined />, color: 'error'};

        return (
          <Tag
            icon={style?.icon}
            color={style?.color}
            className="px-2 py-[2px] !text-xs !font-semibold rounded-full"
            bordered={false}>
            {item}
          </Tag>
        );
      },
    },
    {
      title: 'Course',
      dataIndex: 'course',
      width: 140,
      render: (val: string) => (
        <Tooltip title={val}>
          <Text className="!text-gray-800 !font-medium">{val}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      width: 110,
      render: (val: number) => <Text className="!text-gray-800">{val}</Text>,
    },
    {
      title: 'Section',
      dataIndex: 'section',
      width: 100,
      render: (val: string) => <Text className="!text-gray-800">{val}</Text>,
    },
    {
      title: 'Days',
      dataIndex: 'days',
      width: 220,
      render: (days: string[]) => (
        <div className="flex flex-wrap gap-1.5">
          {days.map((day) => (
            <Tag
              key={day}
              className="px-2 py-[2px] !text-xs rounded-full"
              color="geekblue">
              {day}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      width: 180,
      render: (val: string) => <Text className="!text-gray-800">{val}</Text>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: 140,
      render: (item) => (
        <Space>
          <Popconfirm
            title="Update offered course"
            description="Are you sure to update offered course?"
            okText="Update"
            cancelText="Cancel"
            icon={<QuestionCircleOutlined style={{color: 'red'}} />}
            placement="topRight">
            <span className="text-lg cursor-pointer rounded-full w-9 h-9 flex items-center justify-center bg-blue-50 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
              <BiEdit />
            </span>
          </Popconfirm>

          <Popconfirm
            title="Delete the offered course"
            description="Are you sure to delete this offered course?"
            onConfirm={() => handleDelete(item._id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{loading: deleteLoading}}
            icon={<QuestionCircleOutlined style={{color: 'red'}} />}
            placement="topLeft">
            <span className="text-lg cursor-pointer rounded-full w-9 h-9 flex items-center justify-center bg-red-50 hover:bg-red-100 hover:text-red-600 transition-all duration-200">
              <DeleteOutlined />
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Top Header / Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="">
            <HomeOutlined /> <span>Course Management</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <BookOutlined /> <span>Offered Courses</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Page Title Card */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-600 p-[1px] shadow-lg mb-6">
        <div className="bg-blue-50 rounded-2xl p-5">
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col>
              <div>
                <Title level={3} className="!m-0 text-gray-900">
                  Offered Courses
                </Title>
                <Text className="text-gray-500">
                  Create, search and manage course offerings for the current
                  semester.
                </Text>
              </div>
            </Col>
            <Col>
              <CreateOfferedCourseModal />
            </Col>
          </Row>
        </div>
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

      <Card className="rounded-2xl shadow-lg">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            loading={isFetching}
            pagination={false}
            size="middle"
            sticky
            scroll={{x: 1100}}
            rowClassName={() =>
              'hover:bg-gray-50 transition-colors duration-150'
            }
            className="!border-0"
            locale={{
              emptyText: (
                <div className="py-10 text-center">
                  <Title level={5} className="!mb-1">
                    No offered courses found
                  </Title>
                  <Text className="!text-gray-500">
                    Try adjusting filters or create a new offering.
                  </Text>
                </div>
              ),
            }}
          />
        </div>

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

export default OfferedCourse;

{
  /* Pagination */
}
{
  /* <div className="mt-5 flex justify-end">
  <Pagination
    current={page}
    onChange={(value) => setPage(value)}
    pageSize={meta?.limit}
    total={meta?.total}
    className="bg-white rounded-lg px-3 py-2 shadow-sm"
  />
</div>; */
}

{
  /* Page Title Card */
}
// <div className="rounded-2xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-600 p-[1px] shadow-lg mb-6">
//   <div className="bg-blue-50 rounded-2xl p-5">
//     <Row align="middle" justify="space-between" gutter={[16, 16]}>
//       <Col>
//         <div>
//           <Title level={3} className="!m-0 text-gray-900">
//             Offered Courses
//           </Title>
//           <Text className="text-gray-500">
//             Create, search and manage course offerings for the current
//             semester.
//           </Text>
//         </div>
//       </Col>
//       <Col>
//         <CreateOfferedCourseModal />
//       </Col>
//     </Row>
//   </div>
// </div>
