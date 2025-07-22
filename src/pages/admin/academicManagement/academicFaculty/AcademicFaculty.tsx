import {
  Col,
  Flex,
  Pagination,
  Popconfirm,
  Row,
  Table,
  type TableColumnsType,
} from 'antd';

import type {
  TAcademicFaculty,
  TAcademicFacultyTable,
  TQueryParams,
} from '../../../../types';
import {BiEdit} from 'react-icons/bi';

import {QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {
  useDelAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
} from '../../../../redux/api/academicFacultyApi';
import {PHSearch} from '../../../../components/form/PHSearch';
import Loading from '../../../../components/shared/Loading';
import CreateAcademicFacultyModal from './CreateAcademicFacultyModal';
import {sortOptionsAcademicFaculty} from '../../../../constant';
import PHSort from '../../../../components/form/PHSort';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteAFaculty, {isLoading: deleteLoading}] =
    useDelAcademicFacultyMutation();

  const {
    data: academicFacultyData,
    isFetching,
    isLoading,
  } = useGetAllAcademicFacultyQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
  ]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAFaculty(id).unwrap();

      if (res?.success) {
        toast.success('Course is created successfully!');
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
  const meta = academicFacultyData?.meta;

  const data: TAcademicFacultyTable[] = academicFacultyData?.data?.map(
    (item: TAcademicFaculty) => ({
      key: item._id,
      _id: item._id,
      name: item.name,
      action: item,
    })
  );

  const columns: TableColumnsType<TAcademicFacultyTable> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => {
        return (
          <div className="space-x-5 flex">
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

            <Popconfirm
              title="Delete The Semester Registration"
              description="Are you sure to delete this semester registration?"
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
            <CreateAcademicFacultyModal />
          </Col>
        </Row>
      </Flex>

      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={12} sm={12} md={8} lg={6}>
            <PHSearch setParams={setParams} />
          </Col>

          <Col xs={6} sm={5} md={5} lg={3}>
            <PHSort
              setParams={setParams}
              options={sortOptionsAcademicFaculty}
            />
          </Col>
        </Row>
      </Flex>

      <div className="overflow-x-auto mb-5">
        <Table<TAcademicFacultyTable>
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

export default AcademicFaculty;
