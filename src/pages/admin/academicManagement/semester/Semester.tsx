import {Button, Col, Flex, Input, Pagination, Row, Select, Table} from 'antd';
import type {TableColumnsType, TableProps} from 'antd';
import {toast} from 'sonner';
import {
  sortOptionsSemester,
  type TSemester,
  type TSemesterTable,
} from '../../../../types/semester.type';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import {yearOptions} from '../../../../constant/semester';
import {useState} from 'react';
import type {TMeta, TQueryParams} from '../../../../types';
import {useGetAllSemesterQuery} from '../../../../redux/api/semesterApi';

const Semester = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  // const [searchTerm, setSearchTerm] = useState('');

  const {
    data: semesterData,
    error,
    isFetching,
  } = useGetAllSemesterQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 2},
  ]);
  const meta: TMeta = semesterData?.meta;

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

  if (error) {
    toast.error('error');
  }

  const data: TSemesterTable[] = semesterData?.data?.map((item: TSemester) => ({
    key: item._id,
    name: item.name,
    code: item.code,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
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
      title: 'Code',
      dataIndex: 'code',
      sorter: true,
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

  return (
    <div className="space-y-4">
      <Flex vertical gap="middle" style={{marginBottom: 16}}>
        <Row gutter={[16, 16]} justify="space-between">
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
