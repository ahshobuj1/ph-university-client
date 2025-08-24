import {Pagination, Table, type TableColumnsType, type TableProps} from 'antd';
import {useState} from 'react';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import Loading from '../../../../components/shared/Loading';
import CreateSemesterModal from './CreateSemesterModal';
import {
  sortOptionsSemester,
  type TSemester,
  type TSemesterTable,
} from '../../../../types/semester.type';
import {yearOptions} from '../../../../constant/semester';
import type {TMeta, TQueryParams} from '../../../../types';
import {
  useDeleteSemesterMutation,
  useGetAllSemesterQuery,
} from '../../../../redux/api/semesterApi';
import {PHSearch} from '../../../../components/form/PHSearch';
import PHSort from '../../../../components/form/PHSort';
import BreadcrumbSection from '../../../../components/ui/BreadcrumbSection';
import DeleteActionBtn from '../../../../components/ui/DeleteActionBtn';

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
      if (res?.success) toast.success('Semester deleted successfully!');
      else toast.error(res?.message);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
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
      render: (text) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      filters: yearOptions?.map(({value}) => ({text: value, value})),
      sorter: true,
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      sorter: true,
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'Start Month',
      dataIndex: 'startMonth',
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'End Month',
      dataIndex: 'endMonth',
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <DeleteActionBtn
            id={item._id}
            title="Semester"
            onConfirm={handleDelete}
            loading={deleteLoading}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-primary-light rounded-lg">
      <BreadcrumbSection home="Academic Management" sub="Semester" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          Semester
        </h2>
        <CreateSemesterModal />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div>
          <PHSearch setParams={setParams} />
        </div>
        <div>
          <PHSort setParams={setParams} options={sortOptionsSemester} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <Table<TSemesterTable>
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isFetching}
          onChange={onChange}
          scroll={{x: 'max-content'}}
          rowClassName={() =>
            'hover:bg-gray-50 transition-colors cursor-pointer'
          }
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={meta?.limit}
          total={meta?.total}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Semester;
