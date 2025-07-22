import {
  Col,
  Flex,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Table,
} from 'antd';
import type {TableColumnsType, TableProps} from 'antd';
import {toast} from 'sonner';
import {
  sortOptionsSemester,
  type TSemester,
  type TSemesterTable,
} from '../../../../types/semester.type';
import {yearOptions} from '../../../../constant/semester';
import {useState} from 'react';
import type {TMeta, TQueryParams} from '../../../../types';
import {
  useDeleteSemesterMutation,
  useGetAllSemesterQuery,
} from '../../../../redux/api/semesterApi';
import CreateSemesterModal from './CreateSemesterModal';
import {QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import Loading from '../../../../components/shared/Loading';

const Semester = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteSemester, {isLoading: deleteLoading}] =
    useDeleteSemesterMutation();

  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllSemesterQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  if (isLoading) return <Loading />;

  const meta: TMeta = semesterData?.meta;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSemester(id).unwrap();
      if (res?.success) {
        toast.success('semester is deleted successfully!');
      } else {
        const message = res?.message;
        toast.error(message);
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  };

  const onChange: TableProps<TSemesterTable>['onChange'] = (
    _pagination,
    filters,
    sorter
  ) => {
    const queryParams: TQueryParams[] = [];

    filters.name?.forEach((item) =>
      queryParams.push({name: 'name', value: item})
    );

    filters.year?.forEach((item) =>
      queryParams.push({name: 'year', value: item})
    );

    if (!Array.isArray(sorter) && sorter.field && sorter.order) {
      const sortValue =
        sorter.order === 'ascend' ? sorter.field : `-${sorter.field}`;

      queryParams.push({name: 'sort', value: sortValue});
    }

    setParams(queryParams);
  };

  const data: TSemesterTable[] = semesterData?.data?.map((item: TSemester) => ({
    key: item._id,
    name: item.name,
    code: item.code,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
    action: item,
  }));

  const columns: TableColumnsType<TSemesterTable> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {text: 'Autumn', value: 'Autumn'},
        {text: 'Summer', value: 'Summer'},
        {text: 'Fall', value: 'Fall'},
      ],
      width: '20%',
    },

    {
      title: 'Year',
      dataIndex: 'year',
      filters: yearOptions?.map(({value}: {value: string}) => ({
        text: value,
        value,
      })),
      sorter: true,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      sorter: true,
    },
    {
      title: 'Start-Month',
      dataIndex: 'startMonth',
    },
    {
      title: 'End-Month',
      dataIndex: 'endMonth',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => {
        return (
          <div className="space-x-5 flex">
            <Popconfirm
              title="Delete The Semester"
              description="Are you sure to delete this semester?"
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
    <div className="space-y-4">
      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={24} sm={12} md={8} lg={6}>
            <CreateSemesterModal />
          </Col>
        </Row>
      </Flex>

      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input.Search
              size="large"
              placeholder="Search Here"
              allowClear
              enterButton
              onSearch={(value) => {
                setParams([{name: 'searchTerm', value}]);
              }}
            />
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              size="large"
              placeholder="Sort by"
              className="w-full"
              options={sortOptionsSemester}
              onChange={(value) => {
                setParams([{name: 'sort', value}]);
              }}
            />
          </Col>
        </Row>
      </Flex>

      <div className="overflow-x-auto">
        <Table<TSemesterTable>
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isFetching}
          onChange={onChange}
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

export default Semester;
