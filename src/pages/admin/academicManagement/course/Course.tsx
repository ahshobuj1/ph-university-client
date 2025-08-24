import {Pagination, Table, type TableColumnsType} from 'antd';
import {type TCourse, type TQueryParams} from '../../../../types';
import {useState} from 'react';
import Loading from '../../../../components/shared/Loading';
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from '../../../../redux/api/courseApi';
import {PHSearch} from '../../../../components/form/PHSearch';
import PHSort from '../../../../components/form/PHSort';
import {sortOptionsCourse} from '../../../../constant';
import CreateCourseModal from './CreateCourseModal';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import BreadcrumbSection from '../../../../components/ui/BreadcrumbSection';
import DeleteActionBtn from '../../../../components/ui/DeleteActionBtn';
import EditActionBtn from '../../../../components/ui/EditActionBtn';

const Course = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteCourse, {isLoading: deleteLoading}] = useDeleteCourseMutation();

  const {
    data: courseData,
    isFetching,
    isLoading,
  } = useGetAllCourseQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  if (isLoading) return <Loading />;

  const meta = courseData?.meta;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCourse(id).unwrap();
      if (res?.success) toast.success('Course deleted successfully!');
      else toast.error(res?.message);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  const data: TCourse[] = courseData?.data?.map((item: TCourse) => ({
    key: item._id,
    _id: item._id,
    title: item.title,
    prefix: item.prefix,
    code: item.code,
    credits: item.credits,
    preReq: item.preRequisiteCourses,
    action: item,
  }));

  const columns: TableColumnsType<TCourse> = [
    {title: 'Prefix', dataIndex: 'prefix'},
    {title: 'Title', dataIndex: 'title', width: '20%'},
    {title: 'Code', dataIndex: 'code'},
    {title: 'Credits', dataIndex: 'credits'},
    {
      title: 'Pre Req',
      dataIndex: 'preReq',
      render: (item) =>
        item && item.length > 0 ? (
          item.map(({course}: {course: TCourse}) => (
            <span
              key={course._id}
              className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1">
              {course.code}
            </span>
          ))
        ) : (
          <span className="text-gray-400">None</span>
        ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <EditActionBtn title="Course" />

          <DeleteActionBtn
            id={item._id}
            title="Course"
            onConfirm={handleDelete}
            loading={deleteLoading}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-primary-light rounded-lg">
      <BreadcrumbSection home="Course Management" sub="Courses" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          Courses
        </h2>
        <CreateCourseModal />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <PHSearch setParams={setParams} />
        <PHSort setParams={setParams} options={sortOptionsCourse} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <Table<TCourse>
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isFetching}
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

export default Course;
