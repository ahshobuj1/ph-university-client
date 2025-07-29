import {
  Avatar,
  Col,
  Flex,
  Pagination,
  Row,
  Table,
  Tag,
  type TableColumnsType,
} from 'antd';
import type {
  TFaculty,
  TOfferedCourse,
  TQueryParams,
  TStudent,
} from '../../../../types';
import {useState} from 'react';
import {CheckCircleOutlined, SyncOutlined} from '@ant-design/icons';
import {PHSearch} from '../../../../components/form/PHSearch';
import Loading from '../../../../components/shared/Loading';
import {sortOptionsDepartment} from '../../../../constant';
import PHSort from '../../../../components/form/PHSort';
import type {TEnrolledCourse} from '../../../../types/enrolledCourse.type';
import {useGetAllEnrolledCourseQuery} from '../../../../redux/api/enrolledCourseApi';

const EnrolledCourse = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);

  const {
    data: enrolledCourse,
    isFetching,
    isLoading,
  } = useGetAllEnrolledCourseQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  if (isLoading) {
    return <Loading />;
  }

  const meta = enrolledCourse?.meta;

  const data = enrolledCourse?.data?.map((item: TEnrolledCourse) => ({
    key: item._id,
    action: item,
    faculty: item.faculty,
    student: item.student,
    department: item.department.name,
    academicFaculty: item.academicFaculty.name,
    status: item.semesterRegistration.status,
    course: item.course.prefix + ' - ' + item.course.code,
    grade: item.grade,
    gradePoints: item.gradePoints,
    courseMarks: item.courseMarks,
    isCompleted: item.isCompleted,
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
      title: 'Student',
      dataIndex: 'student',
      render: (item: TStudent) => {
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
      title: 'Status',
      dataIndex: 'isCompleted',
      render: (isCompleted: boolean) => (
        <span>
          {isCompleted ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              complete
            </Tag>
          ) : (
            <Tag icon={<SyncOutlined spin />} color="processing">
              processing
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: 'Marks',
      dataIndex: 'courseMarks',
      render: (marks) => {
        if (!marks) return <Tag color="cyan">No marks yet</Tag>;
        return (
          <div className="flex items-center gap-1 flex-col">
            <span>
              {marks.classTest1 !== 0 && (
                <Tag color="blue">C1: {marks.classTest1}</Tag>
              )}
              {marks.classTest2 !== 0 && (
                <Tag color="blue">C2: {marks.classTest2}</Tag>
              )}
            </span>

            <span>
              {marks.midTerm !== 0 && (
                <Tag color="green">M: {marks.midTerm}</Tag>
              )}
              {marks.finalTerm !== 0 && (
                <Tag color="cyan">F: {marks.finalTerm}</Tag>
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      render: (item) => <p className="font-semibold">{item}</p>,
    },
    {
      title: 'Grade Points',
      dataIndex: 'gradePoints',
      render: (item) => <p className="font-semibold">{item}</p>,
    },
    {
      title: 'Course',
      dataIndex: 'course',
    },
    {
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
  ];

  return (
    <div>
      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={12} sm={12} md={8} lg={6}></Col>
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

export default EnrolledCourse;
