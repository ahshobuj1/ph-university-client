import {
  Button,
  Col,
  Flex,
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
// import PHForm from '../../../../components/form/PHForm';
// import PHInput from '../../../../components/form/PHInput';
// import z from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import {UserOutlined} from '@ant-design/icons';
import {useGetAllRegisterSemesterQuery} from '../../../../redux/api/semesterRegistrationApi';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import {formatDate} from '../../../../utils/formatDate';
import {
  ClockCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import CreateSemesterRegistrationModal from './CreateSemesterRegistrationModal';

export type TSemesterRegistrationTable = Pick<
  TSemesterRegistration,
  'status' | 'semester' | '_id' | 'endDate' | 'maxCredit' | 'startDate'
>;

// const semesterRegistrationSchema = z.object({
//   name: z.string().min(5, 'name must be 5 characters'),
//   email: z.string().email('Please enter a valid email address!'),
// });

const SemesterRegistration = () => {
  const {data: semesterRegistration, isFetching} =
    useGetAllRegisterSemesterQuery(undefined);

  console.log(semesterRegistration);

  const data: TSemesterRegistration[] = semesterRegistration?.data?.map(
    (item: TSemesterRegistration) => ({
      key: item._id,
      name: item.semester.name + ' ' + item.semester.year,
      status: item.status,
      startDate: formatDate(item.startDate),
      endDate: formatDate(item.endDate),
      credit: item.minCredit + ' To ' + item.maxCredit,
      // startMonth: item.startMonth,
      // endMonth: item.endMonth,
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
      render: () => {
        return (
          <div className="space-x-5 flex">
            <Button color="primary" variant="filled">
              <BiEdit />
            </Button>
            <Button color="danger" variant="filled">
              <AiOutlineDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  // const handleSubmit = (values: FieldValues) => {
  //   console.log(values);
  // };

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

      {/* 
      <PHForm
        onSubmit={handleSubmit}
        resolver={zodResolver(semesterRegistrationSchema)}>
        <Row justify={'center'} gutter={[10, 10]}>
          <Col xs={22} md={12} lg={8}>
            <PHInput
              name="name"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col xs={22} md={12} lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col xs={22} md={12} lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col lg={8}>
            <PHInput
              name="name"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit" size="large">
              Submit here
            </Button>
          </Col>
        </Row>
      </PHForm> */}
    </div>
  );
};

export default SemesterRegistration;
