import {
  Col,
  Flex,
  Pagination,
  Popconfirm,
  Row,
  Table,
  Tag,
  type TableColumnsType,
} from 'antd';
import {type TCourse, type TQueryParams} from '../../../../types';
import {QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {BiEdit} from 'react-icons/bi';
import {useState} from 'react';
import Loading from '../../../../components/shared/Loading';
import {useGetAllCourseQuery} from '../../../../redux/api/courseApi';
import {sortOptionsCourse} from '../../../../constant';
import {PHSearch} from '../../../../components/form/PHSearch';
import PHSort from '../../../../components/form/PHSort';
import CreateCourseModal from './CreateCourseModal';

const Course = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);

  const {
    data: courseData,
    isFetching,
    isLoading,
  } = useGetAllCourseQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 2},
  ]);

  if (isLoading) {
    return <Loading />;
  }
  const meta = courseData?.meta;

  const data: TCourse[] = courseData?.data?.map((item: TCourse) => ({
    key: item._id,
    title: item.title,
    prefix: item.prefix,
    code: item.code,
    preReq: item.preRequisiteCourses,
    credits: item.credits,
    action: item,
  }));

  const columns: TableColumnsType<TCourse> = [
    {
      title: 'Prefix',
      dataIndex: 'prefix',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Credits',
      dataIndex: 'credits',
    },
    {
      title: 'Pre Req',
      dataIndex: 'preReq',
      render: (item) => {
        if (Array.isArray(item) && item.length > 0) {
          return item.map(({course}: {course: TCourse}) => (
            <Tag key={course._id} color="blue" bordered={false}>
              {course.code}
            </Tag>
          ));
        } else {
          return <span className="text-gray-400">None</span>;
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => {
        return (
          <div className="space-x-5 flex">
            {item.status !== 'ENDED' && (
              <Popconfirm
                title="Update Status"
                description="Are you sure to update status?"
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
            )}

            <Popconfirm
              title="Delete The Semester Registration"
              description="Are you sure to delete this semester registration?"
              // onConfirm={() => handleDelete(item)}
              okText="Delete"
              cancelText="Cancel"
              // okButtonProps={{loading: deleteLoading}}
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

  // const handleUpdateStatus = async (item: TSemesterRegistration) => {
  //   let status: string;

  //   if (item.status === 'UPCOMING') {
  //     status = 'ONGOING';
  //   } else if (item.status === 'ONGOING') {
  //     status = 'ENDED';
  //   } else return;

  //   const updateData = {
  //     id: item._id,
  //     data: {status},
  //   };

  //   try {
  //     const res = await updateSemesterStatus(updateData).unwrap();
  //     if (res?.success) {
  //       toast.success('Semester Registration deleted successfully!');
  //     } else {
  //       const message = res?.message;
  //       toast.error(message);
  //     }
  //   } catch (err: unknown) {
  //     const message = getErrorMessage(err);
  //     toast.error(message);
  //   }
  // };

  // const handleDelete = async (item: TSemesterRegistration) => {
  //   try {
  //     const res = await deleteRegisterSemester(item._id).unwrap();

  //     if (res?.success) {
  //       toast.success('Semester Registration deleted successfully!');
  //     } else {
  //       const message = res?.message;
  //       toast.error(message);
  //     }
  //   } catch (err: unknown) {
  //     const message = getErrorMessage(err);
  //     toast.error(message);
  //     // const message = err?.data?.message || err?.message || 'Something went wrong...!';
  //   }
  // };

  return (
    <div>
      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={12} sm={12} md={8} lg={6}>
            <CreateCourseModal />
          </Col>
        </Row>
      </Flex>

      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={12} sm={12} md={8} lg={6}>
            <PHSearch setParams={setParams} />
          </Col>

          <Col xs={6} sm={5} md={5} lg={3}>
            <PHSort setParams={setParams} options={sortOptionsCourse} />
          </Col>
        </Row>
      </Flex>

      <div className="overflow-x-auto my-5">
        <Table<TCourse>
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

export default Course;
