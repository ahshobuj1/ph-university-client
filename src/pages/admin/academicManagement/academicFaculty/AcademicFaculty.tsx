import {Button, Table, type TableColumnsType} from 'antd';

import type {TAcademicFaculty, TAcademicFacultyTable} from '../../../../types';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import {useState} from 'react';
import {
  useGetAllAcademicFacultyQuery,
  useGetSingleAcademicFacultyQuery,
} from '../../../../redux/api/academicFacultyApi';

const AcademicFaculty = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  console.log(selectedId);

  const {data: academicFacultyData, isFetching} =
    useGetAllAcademicFacultyQuery(undefined);

  const {data: singleFaculty} = useGetSingleAcademicFacultyQuery(selectedId);
  console.log('singleFaculty->', singleFaculty);

  const data: TAcademicFacultyTable[] = academicFacultyData?.data?.map(
    (item: TAcademicFaculty) => ({
      key: item._id,
      _id: item._id,
      name: item.name,
    })
  );

  const columns: TableColumnsType<TAcademicFacultyTable> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_text, record) => (
        <Button
          color="default"
          variant="link"
          onClick={() => setSelectedId(record._id)}>
          {record.name}
        </Button>
      ),
      filters: [
        {text: 'Autumn', value: 'Autumn'},
        {text: 'Summer', value: 'Summer'},
        {text: 'Fall', value: 'Fall'},
      ],
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
      <Table<TAcademicFacultyTable>
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isFetching}
        // onChange={onChange}
        scroll={{x: 'max-content'}}
      />
    </div>
  );
};

export default AcademicFaculty;
