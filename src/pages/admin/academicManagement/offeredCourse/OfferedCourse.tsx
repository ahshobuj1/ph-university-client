import {
  Avatar,
  Col,
  Flex,
  Pagination,
  Popconfirm,
  Row,
  Table,
  Tag,
  type TableColumnsType,
} from 'antd';
import type {TFaculty, TOfferedCourse, TQueryParams} from '../../../../types';
import {BiEdit} from 'react-icons/bi';
import {QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
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

// import CreateDepartmentModal from './CreateDepartmentModal';

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
        toast.success('offered course is deleted successfully!');
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
      render: (item: TFaculty) => {
        return (
          <span className="flex items-center gap-2 font-semibold text-gray-700">
            <Avatar src={item.profileImage} />

            <span>
              <p className="">{item.id}</p>
              <p className=" text-[10px]">
                {item.name.firstName} {item.name.middleName}{' '}
                {item.name.lastName}
              </p>
            </span>
          </span>
        );
      },
    },

    {
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (item) => {
        let style;

        if (item === 'ONGOING') {
          style = {
            icon: <SyncOutlined spin />,
            color: 'processing',
          };
        }
        if (item === 'UPCOMING') {
          style = {
            icon: <ClockCircleOutlined spin />,
            color: 'cyan',
          };
        }
        if (item === 'ENDED') {
          style = {
            icon: <MinusCircleOutlined />,
            color: 'error',
          };
        }
        return (
          <Tag
            icon={style?.icon}
            color={style?.color}
            style={{padding: '5px 5px', fontSize: '12px'}}
            bordered={false}>
            {item}
          </Tag>
        );
      },
    },
    {
      title: 'Course',
      dataIndex: 'course',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
    },
    {
      title: 'Section',
      dataIndex: 'section',
    },
    {
      title: 'Days',
      dataIndex: 'days',
      render: (days: string[]) => (
        <>
          {days.map((day) => (
            <Tag color="blue" key={day}>
              {day}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => {
        return (
          <div className="space-x-5 flex">
            <Popconfirm
              title="Update offered course"
              description="Are you sure to update offered course?"
              // onConfirm={() => handleUpdateStatus(item)}
              okText="Update"
              cancelText="Cancel"
              // okButtonProps={{loading: deleteLoading}}
              icon={<QuestionCircleOutlined style={{color: 'red'}} />}
              placement="topRight">
              <span className="text-xl cursor-pointer rounded-full w-9 h-9 flex items-center justify-center bg-blue-50 hover:text-blue-500">
                <BiEdit />
              </span>
            </Popconfirm>

            <Popconfirm
              title="Delete The offered course"
              description="Are you sure to delete this offered course?"
              onConfirm={() => handleDelete(item._id)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{loading: deleteLoading}}
              icon={<QuestionCircleOutlined style={{color: 'red'}} />}
              placement="topLeft">
              <span className="text-xl cursor-pointer rounded-full w-9 h-9 flex items-center justify-center bg-blue-50 hover:text-red-500">
                <DeleteOutlined />
              </span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={12} sm={12} md={8} lg={6}>
            {/* <CreateDepartmentModal /> */}
          </Col>
        </Row>
      </Flex>

      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={12} sm={12} md={8} lg={6}>
            <PHSearch setParams={setParams} />
          </Col>

          <Col xs={6} sm={5} md={5} lg={3}>
            <PHSort setParams={setParams} options={sortOptionsDepartment} />
          </Col>
        </Row>
      </Flex>

      <div className="overflow-x-auto mb-5">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isFetching}
          // onChange={onChange}
          scroll={{x: 'max-content'}}
        />
      </div>

      <div>
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={meta?.limit}
          total={meta?.total}
          align="end"
        />
      </div>
    </div>
  );
};

export default OfferedCourse;
