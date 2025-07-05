import {useGetAllSemesterQuery} from '../../../../redux/features/admin/semesterApi';
import {Button, Table} from 'antd';
import type {TableColumnsType, TableProps} from 'antd';
import {toast} from 'sonner';
import type {TSemester, TSemesterTable} from '../../../../types/semester.type';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import {yearOptions} from '../../../../constant/semester';
import {useState} from 'react';

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

const Semester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);

  const {
    data: semesterData,
    error,
    isFetching,
  } = useGetAllSemesterQuery(params);

  const onChange: TableProps<TSemesterTable>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({name: 'name', value: item})
      );

      filters.year?.forEach((item) =>
        queryParams.push({name: 'year', value: item})
      );

      setParams(queryParams);
    }
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
    },
    {
      title: 'Year',
      dataIndex: 'year',
      filters: yearOptions?.map(({value}: {value: string}) => ({
        text: value,
        value,
      })),
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
  );
};

export default Semester;
