import {
  Button,
  Col,
  Flex,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
  type TableColumnsType,
} from 'antd';
import {
  sortOptionsSemester,
  type TSemesterRegistration,
} from '../../../../types';
import {
  ClockCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  useDeleteRegisterSemesterMutation,
  useGetAllRegisterSemesterQuery,
} from '../../../../redux/api/semesterRegistrationApi';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import {formatDate} from '../../../../utils/formatDate';
import CreateSemesterRegistrationModal from './CreateSemesterRegistrationModal';
import {useState} from 'react';
import Loading from '../../../../components/shared/Loading';
import {toast} from 'sonner';
import {QuestionCircleOutlined} from '@ant-design/icons';

const SemesterRegistration = () => {
  const [page, setPage] = useState<number>(1);
  const [deleteRegisterSemester, {isLoading: deleteLoading}] =
    useDeleteRegisterSemesterMutation();

  const {
    data: semesterRegistration,
    isFetching,
    isLoading,
  } = useGetAllRegisterSemesterQuery([
    {name: 'page', value: page},
    {name: 'limit', value: 2},
    {name: 'sort', value: '-status'},
  ]);

  if (isLoading) {
    return <Loading />;
  }
  const meta = semesterRegistration?.meta;

  const data: TSemesterRegistration[] = semesterRegistration?.data?.map(
    (item: TSemesterRegistration) => ({
      key: item._id,
      name: item.semester.name + ' ' + item.semester.year,
      status: item.status,
      startDate: formatDate(item.startDate),
      endDate: formatDate(item.endDate),
      credit: item.minCredit + ' To ' + item.maxCredit,
      action: item._id,
    })
  );

  const columns: TableColumnsType<TSemesterRegistration> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
    },
    {
      title: 'End Month',
      dataIndex: 'endDate',
    },
    {
      title: 'Credits',
      dataIndex: 'credit',
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
            icon: <MinusCircleOutlined spin />,
            color: 'error',
          };
        }
        return (
          <Tag
            icon={style?.icon}
            color={style?.color}
            style={{padding: '5px 5px', fontSize: '14px'}}
            bordered={false}>
            {item}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => {
        return (
          <div className="space-x-5 flex">
            <Button color="primary" variant="filled">
              <BiEdit />
            </Button>

            <Popconfirm
              title="Delete The Semester Registration"
              description="Are you sure to delete this semester registration?"
              onConfirm={() => handleDelete(item)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{loading: deleteLoading}}
              icon={<QuestionCircleOutlined style={{color: 'red'}} />}
              placement="topLeft">
              <Button color="danger" variant="filled">
                <AiOutlineDelete />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRegisterSemester(id).unwrap();

      if (res?.success) {
        toast.success('Semester Registration deleted successfully!');
      } else {
        const message = res?.message;
        toast.error(message);
      }
    } catch (err: any) {
      const message =
        err?.data?.message || err?.message || 'Something went wrong...!';
      toast.error(message);
    }
  };

  return (
    <div>
      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={24} sm={12} md={8} lg={6}>
            <CreateSemesterRegistrationModal />
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              size="large"
              placeholder="Sort by"
              className="w-full"
              options={sortOptionsSemester}
              onChange={(value) => {
                // setParams([{name: 'sort', value}]);
                console.log(value);
              }}
            />
          </Col>
        </Row>
      </Flex>

      <div className="overflow-x-auto my-5">
        <Table<TSemesterRegistration>
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

export default SemesterRegistration;
