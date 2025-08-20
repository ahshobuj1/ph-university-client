import {
  Breadcrumb,
  Pagination,
  Popconfirm,
  Select,
  Table,
  Tag,
  type TableColumnsType,
} from 'antd';
import {
  filterOptionsSemesterRegistration,
  sortOptionsSemesterRegistration,
  type TQueryParams,
  type TSemesterRegistration,
} from '../../../../types';
import {
  ClockCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  HomeOutlined,
  BookOutlined,
} from '@ant-design/icons';
import {
  useDeleteRegisterSemesterMutation,
  useGetAllRegisterSemesterQuery,
  useUpdateRegisterSemesterMutation,
} from '../../../../redux/api/semesterRegistrationApi';
import {BiEdit} from 'react-icons/bi';
import {formatDate} from '../../../../utils/formatDate';
import CreateSemesterRegistrationModal from './CreateSemesterRegistrationModal';
import {useState} from 'react';
import Loading from '../../../../components/shared/Loading';
import {toast} from 'sonner';
import {getErrorMessage} from '../../../../utils/getErrorMessage';

const SemesterRegistration = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteRegisterSemester, {isLoading: deleteLoading}] =
    useDeleteRegisterSemesterMutation();
  const [updateSemesterStatus] = useUpdateRegisterSemesterMutation();

  const {
    data: semesterRegistration,
    isFetching,
    isLoading,
  } = useGetAllRegisterSemesterQuery([
    ...params,
    {name: 'page', value: page},
    {name: 'limit', value: 9},
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
      date: formatDate(item.startDate) + ' - ' + formatDate(item.endDate),
      credit: item.minCredit + ' - ' + item.maxCredit,
      action: item,
    })
  );

  const columns: TableColumnsType<TSemesterRegistration> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      render: (text) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Credits',
      dataIndex: 'credit',
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {text: 'UPCOMING', value: 'UPCOMING'},
        {text: 'ONGOING', value: 'ONGOING'},
        {text: 'ENDED', value: 'ENDED'},
      ],
      render: (item) => {
        let style;
        if (item === 'ONGOING') {
          style = {icon: <SyncOutlined spin />, color: 'processing'};
        }
        if (item === 'UPCOMING') {
          style = {icon: <ClockCircleOutlined />, color: 'cyan'};
        }
        if (item === 'ENDED') {
          style = {icon: <MinusCircleOutlined />, color: 'error'};
        }
        return (
          <Tag
            icon={style?.icon}
            color={style?.color}
            className="text-sm font-medium rounded-md px-3 py-1 shadow-sm">
            {item}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => (
        <div className="flex space-x-3">
          {item.status !== 'ENDED' && (
            <Popconfirm
              title="Update Status"
              description="Are you sure to update status?"
              onConfirm={() => handleUpdateStatus(item)}
              okText="Update"
              cancelText="Cancel"
              okButtonProps={{loading: deleteLoading}}
              icon={<QuestionCircleOutlined style={{color: 'red'}} />}
              placement="topRight">
              <span className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-lg shadow-md transition-transform hover:scale-110">
                <BiEdit size={18} />
              </span>
            </Popconfirm>
          )}
          <Popconfirm
            title="Delete The Semester Registration"
            description="Are you sure to delete this semester registration?"
            onConfirm={() => handleDelete(item)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{loading: deleteLoading}}
            icon={<QuestionCircleOutlined style={{color: 'red'}} />}
            placement="topLeft">
            <span className="cursor-pointer bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-lg shadow-md transition-transform hover:scale-110">
              <DeleteOutlined />
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleUpdateStatus = async (item: TSemesterRegistration) => {
    let status: string;
    if (item.status === 'UPCOMING') {
      status = 'ONGOING';
    } else if (item.status === 'ONGOING') {
      status = 'ENDED';
    } else return;
    const updateData = {id: item._id, data: {status}};
    try {
      const res = await updateSemesterStatus(updateData).unwrap();
      if (res?.success) {
        toast.success('Semester Registration updated successfully!');
      } else {
        const message = res?.message;
        toast.error(message);
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };
  const handleDelete = async (item: TSemesterRegistration) => {
    try {
      const res = await deleteRegisterSemester(item._id).unwrap();
      if (res?.success) {
        toast.success('Semester Registration deleted successfully!');
      } else {
        const message = res?.message;
        toast.error(message);
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };
  return (
    <div>
      <div className="p-6 bg-blue-50 rounded-lg">
        <div className="mb-6">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="">
              <HomeOutlined /> <span>Academic Management</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <BookOutlined /> <span>Semester Registration</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
            Semester Registration
          </h2>
          <CreateSemesterRegistrationModal />
        </div>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select
            size="large"
            placeholder="Filter By Status"
            className="w-full sm:w-60"
            options={filterOptionsSemesterRegistration}
            onChange={(value) => setParams([{name: 'status', value}])}
          />
          <Select
            size="large"
            placeholder="Sort By"
            className="w-full sm:w-60"
            options={sortOptionsSemesterRegistration}
            onChange={(value) => setParams([{name: 'sort', value}])}
          />
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <Table<TSemesterRegistration>
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={isFetching}
            scroll={{x: 'max-content'}}
            rowClassName={() => 'hover:bg-gray-50 transition-colors'}
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
    </div>
  );
};
export default SemesterRegistration;

// import {
//   Col,
//   Flex,
//   Pagination,
//   Popconfirm,
//   Row,
//   Select,
//   Table,
//   Tag,
//   type TableColumnsType,
// } from 'antd';
// import {
//   filterOptionsSemesterRegistration,
//   sortOptionsSemesterRegistration,
//   type TQueryParams,
//   type TSemesterRegistration,
// } from '../../../../types';
// import {
//   ClockCircleOutlined,
//   MinusCircleOutlined,
//   SyncOutlined,
//   QuestionCircleOutlined,
//   DeleteOutlined,
// } from '@ant-design/icons';
// import {
//   useDeleteRegisterSemesterMutation,
//   useGetAllRegisterSemesterQuery,
//   useUpdateRegisterSemesterMutation,
// } from '../../../../redux/api/semesterRegistrationApi';
// import {BiEdit} from 'react-icons/bi';
// import {formatDate} from '../../../../utils/formatDate';
// import CreateSemesterRegistrationModal from './CreateSemesterRegistrationModal';
// import {useState} from 'react';
// import Loading from '../../../../components/shared/Loading';
// import {toast} from 'sonner';
// import {getErrorMessage} from '../../../../utils/getErrorMessage';

// const SemesterRegistration = () => {
//   const [params, setParams] = useState<TQueryParams[]>([]);
//   const [page, setPage] = useState<number>(1);

//   const [deleteRegisterSemester, {isLoading: deleteLoading}] =
//     useDeleteRegisterSemesterMutation();
//   const [updateSemesterStatus] = useUpdateRegisterSemesterMutation();

//   const {
//     data: semesterRegistration,
//     isFetching,
//     isLoading,
//   } = useGetAllRegisterSemesterQuery([
//     ...params,
//     {name: 'page', value: page},
//     {name: 'limit', value: 9},
//   ]);

//   if (isLoading) {
//     return <Loading />;
//   }
//   const meta = semesterRegistration?.meta;

//   const data: TSemesterRegistration[] = semesterRegistration?.data?.map(
//     (item: TSemesterRegistration) => ({
//       key: item._id,
//       name: item.semester.name + ' ' + item.semester.year,
//       status: item.status,
//       date: formatDate(item.startDate) + ' - ' + formatDate(item.endDate),
//       credit: item.minCredit + ' - ' + item.maxCredit,
//       action: item,
//     })
//   );

//   const columns: TableColumnsType<TSemesterRegistration> = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       width: '20%',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//     },
//     {
//       title: 'Credits',
//       dataIndex: 'credit',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       filters: [
//         {text: 'UPCOMING', value: 'UPCOMING'},
//         {text: 'ONGOING', value: 'ONGOING'},
//         {text: 'ENDED', value: 'ENDED'},
//       ],
//       render: (item) => {
//         let style;

//         if (item === 'ONGOING') {
//           style = {
//             icon: <SyncOutlined spin />,
//             color: 'processing',
//           };
//         }
//         if (item === 'UPCOMING') {
//           style = {
//             icon: <ClockCircleOutlined spin />,
//             color: 'cyan',
//           };
//         }
//         if (item === 'ENDED') {
//           style = {
//             icon: <MinusCircleOutlined />,
//             color: 'error',
//           };
//         }
//         return (
//           <Tag
//             icon={style?.icon}
//             color={style?.color}
//             style={{padding: '5px 5px', fontSize: '14px'}}
//             bordered={false}>
//             {item}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       render: (item) => {
//         return (
//           <div className="space-x-5 flex">
//             {item.status !== 'ENDED' && (
//               <Popconfirm
//                 title="Update Status"
//                 description="Are you sure to update status?"
//                 onConfirm={() => handleUpdateStatus(item)}
//                 okText="Update"
//                 cancelText="Cancel"
//                 okButtonProps={{loading: deleteLoading}}
//                 icon={<QuestionCircleOutlined style={{color: 'red'}} />}
//                 placement="topRight">
//                 <span className="text-xl cursor-pointer rounded-full w-9 h-9 flex items-center justify-center bg-blue-50 hover:text-red-500">
//                   <BiEdit />
//                 </span>
//               </Popconfirm>
//             )}

//             <Popconfirm
//               title="Delete The Semester Registration"
//               description="Are you sure to delete this semester registration?"
//               onConfirm={() => handleDelete(item)}
//               okText="Delete"
//               cancelText="Cancel"
//               okButtonProps={{loading: deleteLoading}}
//               icon={<QuestionCircleOutlined style={{color: 'red'}} />}
//               placement="topLeft">
//               <span className="text-xl cursor-pointer rounded-full w-9 h-9 flex items-center justify-center bg-blue-50 hover:text-red-500">
//                 <DeleteOutlined />
//               </span>
//             </Popconfirm>
//           </div>
//         );
//       },
//     },
//   ];

//   const handleUpdateStatus = async (item: TSemesterRegistration) => {
//     let status: string;

//     if (item.status === 'UPCOMING') {
//       status = 'ONGOING';
//     } else if (item.status === 'ONGOING') {
//       status = 'ENDED';
//     } else return;

//     const updateData = {
//       id: item._id,
//       data: {status},
//     };

//     try {
//       const res = await updateSemesterStatus(updateData).unwrap();
//       if (res?.success) {
//         toast.success('Semester Registration deleted successfully!');
//       } else {
//         const message = res?.message;
//         toast.error(message);
//       }
//     } catch (err: unknown) {
//       const message = getErrorMessage(err);
//       toast.error(message);
//     }
//   };

//   const handleDelete = async (item: TSemesterRegistration) => {
//     try {
//       const res = await deleteRegisterSemester(item._id).unwrap();

//       if (res?.success) {
//         toast.success('Semester Registration deleted successfully!');
//       } else {
//         const message = res?.message;
//         toast.error(message);
//       }
//     } catch (err: unknown) {
//       const message = getErrorMessage(err);
//       toast.error(message);
//       // const message = err?.data?.message || err?.message || 'Something went wrong...!';
//     }
//   };

//   return (
//     <div>
//       <Flex vertical gap="middle">
//         <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
//           <Col xs={12} sm={12} md={8} lg={6}>
//             <CreateSemesterRegistrationModal />
//           </Col>
//         </Row>
//       </Flex>

//       <Flex vertical gap="middle">
//         <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
//           <Col xs={12} sm={12} md={8} lg={6}>
//             <Select
//               size="large"
//               placeholder="Filter By Status"
//               className="w-full"
//               options={filterOptionsSemesterRegistration}
//               onChange={(value) => {
//                 setParams([{name: 'status', value}]);
//                 // console.log(value);
//               }}
//             />
//           </Col>

//           <Col xs={6} sm={5} md={5} lg={3}>
//             <Select
//               size="large"
//               placeholder="Sort by"
//               variant="borderless"
//               className="w-full"
//               options={sortOptionsSemesterRegistration}
//               onChange={(value) => {
//                 setParams([{name: 'sort', value}]);
//               }}
//             />
//           </Col>
//         </Row>
//       </Flex>

//       <div className="overflow-x-auto my-5">
//         <Table<TSemesterRegistration>
//           columns={columns}
//           dataSource={data}
//           pagination={false}
//           loading={isFetching}
//           scroll={{x: 'max-content'}}
//         />
//       </div>

//       <div>
//         <Pagination
//           current={page}
//           onChange={(value) => setPage(value)}
//           pageSize={meta?.limit}
//           total={meta?.total}
//           align="end"
//         />
//       </div>
//     </div>
//   );
// };

// export default SemesterRegistration;
